import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../modules/auth/jwt.utils';
import { AUTH_COOKIE_NAME } from '../config/cookie';
import { AppError } from './error-handler';
import '../types/auth.types';

/**
 * Reusable Express authentication middleware.
 * 1. Reads HttpOnly access_token cookie.
 * 2. Verifies JWT signature and expiration.
 * 3. Attaches { id, role } to req.user.
 * 4. Rejects missing, malformed, or expired tokens with 401 UNAUTHORIZED.
 */
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME];

    if (!token || typeof token !== 'string') {
      throw new AppError('Authentication token required', 401, 'UNAUTHORIZED');
    }

    const payload = await verifyAccessToken(token);

    req.user = {
      id: payload.sub,
      role: payload.role,
    };

    next();
  } catch (err) {
    next(err);
  }
};

/**
 * Reusable Express authorization middleware requiring ADMIN role.
 * Rejects unauthenticated requests or requests from non-ADMIN roles with 403 FORBIDDEN.
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== 'ADMIN') {
    throw new AppError('Administrative authorization required', 403, 'FORBIDDEN');
  }
  next();
};

