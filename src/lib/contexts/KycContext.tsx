/* eslint-disable no-console */
import React, { useCallback, useState } from "react";
import { Credentials as CredentialClient } from "@verida/verifiable-credentials";
import { config } from "config";
import { useVerida } from "lib/hooks";
import { getFinclusiveKycFormUrl } from "lib/utils";

type VerifiableCredential = {
  didJwtVc: string;
};

type VerifiedCredential = {
  verified: boolean;
  verifiableCredential: {
    credentialSchema: { id: string };
    issuer: { id: string };
  };
};

type Message<D> = {
  data: {
    data: D[];
    replyId: string;
  };
};

const credentialClient = new CredentialClient();

async function verifyFinClusiveKycCredential(
  didJwtVc: string
): Promise<boolean> {
  if (!config.finClusiveDid || !config.kycVCSchemaId) {
    console.error("Missing information to verify the Verifiable Credential");
    return false;
  }

  const decodedVc = (await credentialClient.verifyCredential(
    didJwtVc
  )) as VerifiedCredential;

  return decodedVc
    ? decodedVc.verified &&
        decodedVc.verifiableCredential.issuer.id === config.finClusiveDid &&
        decodedVc.verifiableCredential.credentialSchema.id ===
          config.kycVCSchemaId
    : false;
}

type KycContextType = {
  kycValid: boolean;
  isWaitingKYCRequest: boolean;
  sendKYCRequest: () => Promise<void>;
  resetKYC: () => void;
};

export const KycContext = React.createContext<KycContextType>({
  kycValid: false,
  isWaitingKYCRequest: false,
  sendKYCRequest: () => Promise.resolve(),
  resetKYC: () => {},
});

interface KycProviderProps {
  children?: React.ReactNode;
}

export const KycProvider: React.FunctionComponent<KycProviderProps> = (
  props
) => {
  const [isWaitingKYCRequest, setWaitingKYCRequest] = useState(false);
  const [kycValid, setKycValid] = useState(false);

  const { did, webUserInstanceRef } = useVerida();

  const sendKYCRequest = useCallback(async () => {
    const context = await webUserInstanceRef.current.getContext();
    if (!context || !did || !config.vcSchemaURL) {
      console.error("Missing information to sent the KYC request");
      return;
    }

    setWaitingKYCRequest(true);

    const messaging = await context.getMessaging();

    void messaging.onMessage(async (message: Message<VerifiableCredential>) => {
      console.debug(message);
      try {
        if (message.data.data.length > 0) {
          const vc = message.data.data[0];
          const isValid = await verifyFinClusiveKycCredential(vc.didJwtVc);
          setKycValid(isValid);
        }
      } catch (error: unknown) {
        console.error(error);
        setKycValid(false);
      } finally {
        setWaitingKYCRequest(false);
      }
    });

    const message = "Please share a KYC credential";
    const messageType = "inbox/type/dataRequest";

    const messageData = {
      requestSchema: config.vcSchemaURL, // Request a Credential stored in the Verida Network
      filter: config.kycVCSchemaId
        ? {
            credentialSchema: config.kycVCSchemaId,
            // Filter only Credentials with a certain schema, ie a KYC schema.
          }
        : {},
      fallbackAction: {
        label: "Perform a KYC with FinClusive",
        url: getFinclusiveKycFormUrl(did),
      },
      userSelectLimit: 1,
      userSelect: true,
    };

    await messaging.send(did, messageType, messageData, message, {
      recipientContextName: "Verida: Vault",
      did,
    });
  }, [webUserInstanceRef, did]);

  const resetKYC = useCallback(() => {
    setWaitingKYCRequest(false);
    setKycValid(false);
  }, []);

  const value: KycContextType = {
    isWaitingKYCRequest,
    kycValid,
    sendKYCRequest,
    resetKYC,
  };

  return (
    <KycContext.Provider value={value}>{props.children}</KycContext.Provider>
  );
};
