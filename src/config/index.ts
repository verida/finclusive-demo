import { EnvironmentType } from "@verida/types";

const appTitle = "Compliant App";

const nodeEnv = process.env.NODE_ENV || "development";

const veridaEnv: EnvironmentType =
  process.env.REACT_APP_VERIDA_ENV === "local"
    ? EnvironmentType.LOCAL
    : process.env.REACT_APP_VERIDA_ENV === "mainnet"
    ? EnvironmentType.MAINNET
    : EnvironmentType.TESTNET;

const veridaContextName = process.env.REACT_APP_VERIDA_APP_CONTEXT_NAME;
const veridaLogoUrl = process.env.REACT_APP_VERIDA_APP_LOGO_URL;
const kycProviderFormURL = process.env.REACT_APP_KYC_PROVIDER_URL;
const finclusiveAccessCode = process.env.REACT_APP_FINCLUSIVE_ACCESS_CODE;
const vcSchemaURL = process.env.REACT_APP_VC_SCHEMA_URL;
const finClusiveDid = process.env.REACT_APP_FINCLUSIVE_DID;
const kycVCSchemaId = process.env.REACT_APP_KYC_VC_SCHEMA_ID;

export const config = {
  appTitle,
  nodeEnv,
  veridaEnv,
  veridaContextName,
  veridaLogoUrl,
  kycProviderFormURL,
  finclusiveAccessCode,
  vcSchemaURL,
  finClusiveDid,
  kycVCSchemaId,
};
