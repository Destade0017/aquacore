import { SignJWT, jwtVerify } from 'jose';
import { UserRole } from '@prisma/client';
import { config } from '../../config/env';
import { AppError } from '../../middleware/error-handler';

export interface JWTPayload {
  sub: string;
  role: UserRole;
}

// Convert JWT secret string to Uint8Array for jose HS256 algorithm
const getSecretKey = (): Uint8Array => {
  return new TextEncoder().encode(config.jwtSecret);
};

/**
 * Signs a minimal JWT access token containing User ID and User Role.
 * Uses HS256 algorithm and configured expiration. Never logs tokens or secrets.
 * 
 * @param payload Object containing user ID (sub) and role
 * @param expiresIn Optional override for expiration time (e.g., '15m', '1d')
 * @returns Promise resolving to the signed JWT string
 */
export const signAccessToken = async (
  payload: JWTPayload,
  expiresIn: string = config.jwtExpiresIn
): Promise<string> => {
  const secretKey = getSecretKey();

  return new SignJWT({ role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
};

/**
 * Verifies a JWT access token signature, expiration, and algorithm.
 * Never logs tokens or secrets. Throws controlled AppError if invalid.
 * 
 * @param token The JWT access token string to verify
 * @returns Promise resolving to verified JWTPayload (sub, role)
 */
export const verifyAccessToken = async (token: string): Promise<JWTPayload> => {
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
    });

    if (!payload.sub || typeof payload.sub !== 'string') {
      throw new AppError('Invalid token claims', 401, 'UNAUTHORIZED');
    }

    const role = payload.role as UserRole;
    if (!role || (role !== 'CUSTOMER' && role !== 'ADMIN')) {
      throw new AppError('Invalid token role claim', 401, 'UNAUTHORIZED');
    }

    return {
      sub: payload.sub,
      role,
    };
  } catch (err: unknown) {
    if (err instanceof AppError) {
      throw err;
    }
    // Return controlled error without exposing raw cryptographic details
    throw new AppError('Invalid or expired authentication token', 401, 'UNAUTHORIZED');
  }
};
