export enum SdkError {
  INVALID_ADDRESS = 'Address is invalid',
  INVALID_TOKEN = 'Auth Token is invalid',
  MISSING_TOKEN = 'Auth Token is missing, please call `initialize()` to set it',
  TOKEN_VALIDATION_ERROR = 'An error occurred while validating the Auth JWT',
  TOKEN_EXPIRED = 'Auth Token has expired',
}

export interface TideSDKConfig {
  AUTH_TOKEN: string;
  TIDE_BASE_URL?: string;
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
