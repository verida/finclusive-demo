declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV?: "production" | "development" | "test";
    EXTEND_ESLINT?: "true" | "false";
    REACT_APP_VERIDA_APP_CONTEXT_NAME?: string;
    REACT_APP_VERIDA_APP_LOGO_URL?: string;
    REACT_APP_VERIDA_ENV?: "local" | "testnet" | "mainnet";
    REACT_APP_KYC_PROVIDER_URL?: string;
    REACT_APP_KYC_VC_SCHEMA_URL?: string;
  }
}
