import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

// Fail clearly in production if JWT_SECRET is missing or insecure
const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (isProduction && (!secret || secret.length < 32)) {
    throw new Error('FATAL: Production JWT_SECRET must be set and at least 32 characters long.');
  }
  return secret || 'dev-secret-key-change-in-production-min-32-chars';
};

export const config = {
  port: parseInt(process.env.PORT || '5001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  isProduction,
  jwtSecret: getJwtSecret(),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
};
