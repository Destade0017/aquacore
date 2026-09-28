import { CookieOptions } from 'express';
import { config } from './env';

export const AUTH_COOKIE_NAME = 'access_token';

/**
 * Centralized Cookie configuration for secure HttpOnly authentication tokens.
 * Enforces httpOnly, path, sameSite, and secure flags according to environment.
 */
export const getAuthCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: config.isProduction,
  sameSite: 'lax',
  path: '/',
});
