import { config } from "config";

export const getFinclusiveKycFormUrl = (did?: string) => {
  return config.kycProviderFormURL && config.finclusiveAccessCode && did
    ? `${config.kycProviderFormURL}?accessCode=${
        config.finclusiveAccessCode
      }&veridaDID=${encodeURI(did)}`
    : "https://finclusive.com/";
};
