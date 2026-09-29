import { Router } from 'express';
import { registerCustomer, loginUser, logoutUser, getCurrentUser } from '../modules/auth/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';

const authRouter = Router();

/**
 * @route POST /api/v1/auth/register
 * @desc Register a new customer account
 * @access Public
 */
authRouter.post('/register', registerCustomer);

/**
 * @route POST /api/v1/auth/login
 * @desc Authenticate user (CUSTOMER or ADMIN) and issue access_token cookie
 * @access Public
 */
authRouter.post('/login', loginUser);

/**
 * @route POST /api/v1/auth/logout
 * @desc Clear access_token cookie
 * @access Public (idempotent, unauthenticated)
 */
authRouter.post('/logout', logoutUser);

/**
 * @route GET /api/v1/auth/me
 * @desc Get current authenticated user profile
 * @access Private (Protected by requireAuth)
 */
authRouter.get('/me', requireAuth, getCurrentUser);

export default authRouter;
