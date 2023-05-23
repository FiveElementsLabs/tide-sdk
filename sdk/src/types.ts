export enum SdkErrors {
  INVALID_ADDRESS = 'Address is invalid',
  INVALID_TOKEN = 'Auth Token is invalid',
  MISSING_TOKEN = 'Auth Token is missing, please call `initialize()` to set it',
  TOKEN_VALIDATION_ERROR = 'An error occurred while validating the Auth JWT',
  TOKEN_EXPIRED = 'Auth Token has expired',
}

export enum ReferralError {
  NO_JWT_HEADER = 'Could not find the authentication header in the request',
  NO_JWT_PAYLOAD = 'Could not deserialize authentication payload properly',
  NO_REFERRER = 'Could not find the referrer address',
  NO_REFERRAL_ID = 'Could not find the referralId property',
  DUPLICATE_REFERRAL = 'A referral with this data is already present',
  NO_ACTION = 'Unrecognised action event.',
  CAMPAIGN_NOT_FOUND = 'Campaign not found',
  NO_REFERRAL = 'No referral found',
}

export interface TideSDKConfig {
  AUTH_TOKEN: string;
}

export enum Actions {
  COMPLETE_REFERRAL = 'COMPLETE_REFERRAL',
  ADD_REFERRED = 'ADD_REFERRED',
  PAGE_VIEW = 'PAGE_VIEW',
}

export interface JwtPayload {
  sub: string; // subject
  iss: string; // issuer
  iat: number; // issued at
  exp: number; // expiration time
  aud?: string | string[]; // audience
  [key: string]: any; // additional properties
}
