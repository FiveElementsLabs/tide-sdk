import axios from 'axios';
import { isAddress } from 'viem';

import { TideSDKConfig, SdkErrors, Actions } from './types';
import { TIDE_BASE_URL } from './constants';
import { parseJwt } from './utils';

let authToken: string | null = null;

/**
 * ## Initialize the Tide SDK with the provided config.
 */
export function initialize(config: TideSDKConfig) {
  authToken = config.AUTH_TOKEN;

  const expirationDate = parseJwt(authToken).exp;
  const now = new Date().getTime() / 1_000;

  if (expirationDate < now) throw new Error(SdkErrors.TOKEN_EXPIRED);
}

/**
 * ## Identify a user by their address and referral code.
 *
 * This function should be called every time a new user lands on your site
 * and connects their wallet. The `referralCode` property is the value provided in
 * the `tide_ref` query parameter of the Tide referral campaign.
 */
export async function identify(address: string, referralCode: string) {
  if (!authToken) throw new Error(SdkErrors.MISSING_TOKEN);
  if (!isAddress(address)) throw new Error(SdkErrors.INVALID_ADDRESS);

  try {
    await axios.request({
      url: `${TIDE_BASE_URL}/referral/track`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      data: JSON.stringify({
        action: Actions.ADD_REFERRED,
        userAddress: address,
        referralId: referralCode,
      }),
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 400)
        throw new Error(`Bad request: ${err.response.data.message}`);
      if (err.response?.status === 401)
        throw new Error(`Unauthorized: ${err.response.data.message}`);
      if (err.response?.status === 500)
        throw new Error(`Internal server error: ${err.response.data.message}`);
    }
  }
}

/**
 * ## Complete a referral
 *
 * This function should be called when a user completes a specific call-to-action
 * on your site. For example, if you are running a referral campaign where users
 * are to be considered referred when they mint an NFT, this function should be
 * called when the user successfully mints the NFT.
 *
 * Returns `true` if the referral was successfully completed.
 * On failure, an error will be thrown with the reason for failure.
 */
export async function completeReferral(address: string): Promise<boolean> {
  if (!authToken) throw new Error(SdkErrors.MISSING_TOKEN);
  if (!isAddress(address)) throw new Error(SdkErrors.INVALID_ADDRESS);

  try {
    await axios.request({
      url: `${TIDE_BASE_URL}/referral/track`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      data: JSON.stringify({
        action: Actions.COMPLETE_REFERRAL,
        userAddress: address,
      }),
    });
    return true;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 400)
        throw new Error(`Bad request: ${err.response.data.message}`);
      if (err.response?.status === 401)
        throw new Error(`Unauthorized: ${err.response.data.message}`);
      if (err.response?.status === 500)
        throw new Error(`Internal server error: ${err.response.data.message}`);
    }
    return false;
  }
}