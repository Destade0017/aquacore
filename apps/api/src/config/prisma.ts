import { PrismaClient } from '@prisma/client';
import { config } from './env';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Reusable, centralized Prisma Client instance.
 * Uses a global singleton in development to prevent connection exhaustion during hot reloads.
 */
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: config.isProduction ? ['error'] : ['query', 'info', 'warn', 'error'],
  });

if (!config.isProduction) {
  globalForPrisma.prisma = prisma;
}

export default prisma;
