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
  isConnecting: boolean;
  isConnected: boolean;
  account: VaultAccount | null;
  context: Context | null;
  profile: UserProfile | null;
};

export const VeridaContext = React.createContext<VeridaContextType>({
  connect: async () => {},
  disconnect: async () => {},
  isConnecting: false,
  isConnected: false,
  account: null,
  context: null,
  profile: null,
});

export const VeridaProvider: React.FunctionComponent<VeridaProviderType> = (
  props
) => {
  const [isConnecting, setIsConnecting] = React.useState<boolean>(false);
  const [isConnected, setIsConnected] = React.useState<boolean>(false);
  const [account, setAccount] = React.useState<VaultAccount | null>(null);
  const [context, setContext] = React.useState<Context | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);

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
  }, [account]);

  useEffect(() => {
    if (config.veridaContextName && hasSession(config.veridaContextName)) {
      void connect();
    }
  }, [connect]);

  const contextValue: VeridaContextType = {
    connect,
    disconnect,
    isConnecting,
    isConnected,
    account,
    context,
    profile,
  };

  return (
    <VeridaContext.Provider value={contextValue}>
      {props.children}
    </VeridaContext.Provider>
  );
};