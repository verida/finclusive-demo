import React, { useCallback, useEffect } from "react";
import { Context } from "@verida/client-ts";
import { VaultAccount, hasSession } from "@verida/account-web-vault";
import { config } from "config";
import { UserProfile } from "lib/types";
import { Verida } from "lib/utils";

type VeridaProviderType = {
  children?: React.ReactNode;
};

type VeridaContextType = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  sendKYCRequest: () => Promise<void>;
  resetKYC: () => void;
  isConnecting: boolean;
  isConnected: boolean;
  account: VaultAccount | null;
  context: Context | null;
  profile: UserProfile | null;
  waitingKYCRequest: boolean;
  kycChecked: boolean;
};

export const VeridaContext = React.createContext<VeridaContextType>({
  connect: async () => {},
  disconnect: async () => {},
  sendKYCRequest: async () => {},
  resetKYC: () => {},
  isConnecting: false,
  isConnected: false,
  account: null,
  context: null,
  profile: null,
  waitingKYCRequest: false,
  kycChecked: false,
});

export const VeridaProvider: React.FunctionComponent<VeridaProviderType> = (
  props
) => {
  const [isConnecting, setIsConnecting] = React.useState<boolean>(false);
  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const [account, setAccount] = React.useState<VaultAccount | null>(null);
  const [context, setContext] = React.useState<Context | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [waitingKYCRequest, setWaitingKYCRequest] = React.useState(false);
  const [kycChecked, setKYCChecked] = React.useState(false);

  const connect = useCallback(async () => {
    if (!config.veridaContextName) {
      // TODO handle env variable not defined
      return;
    }

    setIsConnecting(true);
    try {
      const [vContext, vAccount, vProfile] = await Verida.connect(
        config.veridaContextName,
        config.veridaEnv,
        config.veridaLogoUrl,
        window.location.href
      );
      setContext(vContext);
      setAccount(vAccount);
      setProfile(vProfile);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
      setAccount(null);
      setContext(null);
      setProfile(null);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    if (account) {
      // TODO handle error
      await Verida.disconnect(account, config.veridaContextName);
    }
    setIsConnected(false);
    setIsConnecting(false);
    setAccount(null);
    setContext(null);
    setProfile(null);
    setWaitingKYCRequest(false);
    setKYCChecked(false);
  }, [account]);

  const sendKYCRequest = useCallback(async () => {
    if (!context || !profile) {
      return;
    }
    console.debug("Preparing KYC request");
    setWaitingKYCRequest(true);

    const messaging = await context.getMessaging();

    void messaging.onMessage((message: string) => {
      console.log("message received from Verida", message);
      setWaitingKYCRequest(false);
      // TODO check KYC VC
      setKYCChecked(true);
    });

    const message = "Please share a KYC credential";
    const messageType = "inbox/type/dataRequest";

    const messageData = {
      requestSchema:
        "https://common.schemas.verida.io/identity/kyc/AU/v0.1.1/schema.json",
      filter: {},
      userSelect: true,
    };

    const requestFromDID = profile.id;

    await messaging.send(requestFromDID, messageType, messageData, message, {
      recipientContextName: "Verida: Vault",
      did: requestFromDID,
    });
    console.debug("KYC request sent");
  }, [context, profile]);

  const resetKYC = useCallback(() => {
    setWaitingKYCRequest(false);
    setKYCChecked(false);
  }, []);

  useEffect(() => {
    if (config.veridaContextName && hasSession(config.veridaContextName)) {
      void connect();
    }
  }, [connect]);

  const contextValue: VeridaContextType = {
    connect,
    disconnect,
    sendKYCRequest,
    resetKYC,
    isConnecting,
    isConnected,
    account,
    context,
    profile,
    waitingKYCRequest,
    kycChecked,
  };

  return (
    <VeridaContext.Provider value={contextValue}>
      {props.children}
    </VeridaContext.Provider>
  );
};
