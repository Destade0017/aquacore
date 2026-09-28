import { UserRole } from '@prisma/client';

/**
 * Minimal authenticated user identity attached to Express Request context
 */
export interface AuthUser {
  id: string;
  role: UserRole;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
