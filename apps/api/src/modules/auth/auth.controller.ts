import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { prisma } from '../../config/prisma';
import { hashPassword, verifyPassword } from './password.utils';
import { signAccessToken } from './jwt.utils';
import { AUTH_COOKIE_NAME, getAuthCookieOptions } from '../../config/cookie';
import { AppError } from '../../middleware/error-handler';

/**
 * Validates basic email format using standard regex.
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Handles POST /api/v1/auth/register
 * Creates a new customer account securely.
 */
export const registerCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body || {};

    // 1. Input presence & type validation
    if (!email || typeof email !== 'string' || !email.trim()) {
      throw new AppError('Email is required', 400, 'VALIDATION_ERROR');
    }

    if (!password || typeof password !== 'string') {
      throw new AppError('Password is required', 400, 'VALIDATION_ERROR');
    }

    if (!firstName || typeof firstName !== 'string' || !firstName.trim()) {
      throw new AppError('First name is required', 400, 'VALIDATION_ERROR');
    }

    if (!lastName || typeof lastName !== 'string' || !lastName.trim()) {
      throw new AppError('Last name is required', 400, 'VALIDATION_ERROR');
    }

    // 2. Normalization & format checks
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedFirstName = firstName.trim();
    const normalizedLastName = lastName.trim();

    if (!isValidEmail(normalizedEmail)) {
      throw new AppError('Please provide a valid email address', 400, 'INVALID_EMAIL');
    }

    if (password.length < 8) {
      throw new AppError('Password must be at least 8 characters long', 400, 'INVALID_PASSWORD');
    }

    // 3. Duplicate email check
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingUser) {
      throw new AppError('An account with this email address already exists', 409, 'EMAIL_ALREADY_EXISTS');
    }

    // 4. Secure password hashing
    const passwordHash = await hashPassword(password);

    // 5. Create user record (role strictly enforced as CUSTOMER)
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        firstName: normalizedFirstName,
        lastName: normalizedLastName,
        role: UserRole.CUSTOMER,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });

    // 6. Return safe response without passwordHash or JWT
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles POST /api/v1/auth/login
 * Authenticates existing CUSTOMER or ADMIN user and sets secure HttpOnly access_token cookie.
 */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body || {};

    // 1. Input presence & type validation
    if (!email || typeof email !== 'string' || !email.trim()) {
      throw new AppError('Email is required', 400, 'VALIDATION_ERROR');
    }

    if (!password || typeof password !== 'string') {
      throw new AppError('Password is required', 400, 'VALIDATION_ERROR');
    }

    // 2. Normalization & format checks
    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      throw new AppError('Please provide a valid email address', 400, 'INVALID_EMAIL');
    }

    // 3. User lookup by email
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // 4. Verify user exists & password matches stored hash
    // Generic error message to prevent user enumeration attacks
    if (!user) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }

    // 5. Sign access token using established claims (sub: user.id, role: user.role)
    const token = await signAccessToken({
      sub: user.id,
      role: user.role,
    });

    // 6. Set secure HttpOnly authentication cookie
    res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

    // 7. Return safe user representation (no passwordHash, no raw JWT in JSON body)
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles POST /api/v1/auth/logout
 * Safely clears the access_token authentication cookie.
 * Idempotent & unauthenticated (does not require requireAuth or database query).
 */
export const logoutUser = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Clear access_token cookie using centralized cookie options
    res.clearCookie(AUTH_COOKIE_NAME, getAuthCookieOptions());

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Handles GET /api/v1/auth/me
 * Retrieves current authenticated user record from PostgreSQL using req.user.id.
 * Protected by requireAuth middleware.
 */
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Authentication required', 401, 'UNAUTHORIZED');
    }

    // Lookup user by authoritative req.user.id with explicit safe field selection
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // Handle scenario where JWT is valid but user record was deleted from database
    if (!user) {
      throw new AppError('User account no longer exists', 401, 'UNAUTHORIZED');
    }

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
