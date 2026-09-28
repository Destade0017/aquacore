import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /api/v1/health
 * Returns API status and current timestamp
 */
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'AquaCore API is operational',
    timestamp: new Date().toISOString(),
  });
});

export default router;
