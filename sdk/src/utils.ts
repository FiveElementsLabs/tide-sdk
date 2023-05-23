import { JwtPayload } from './types';

export function parseJwt(token: string): JwtPayload {
  return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
