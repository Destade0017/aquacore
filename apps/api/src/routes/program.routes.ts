import { Router } from 'express';
import {
  getActivePrograms,
  getAdminPrograms,
  getProgramBySlug,
  createProgram,
  updateProgram,
  deactivateProgram,
} from '../modules/program/program.controller';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const programRouter = Router();

/**
 * @route GET /api/v1/programs
 * @desc Get all active programs
 * @access Public
 */
programRouter.get('/', getActivePrograms);

/**
 * @route GET /api/v1/programs/admin/all
 * @desc Get all programs including inactive ones
 * @access Admin only
 */
programRouter.get('/admin/all', requireAuth, requireAdmin, getAdminPrograms);

/**
 * @route GET /api/v1/programs/:slug
 * @desc Get a single active program by slug
 * @access Public
 */
programRouter.get('/:slug', getProgramBySlug);


/**
 * @route POST /api/v1/programs
 * @desc Create a new program
 * @access Admin only
 */
programRouter.post('/', requireAuth, requireAdmin, createProgram);

/**
 * @route PATCH /api/v1/programs/:id
 * @desc Update an existing program
 * @access Admin only
 */
programRouter.patch('/:id', requireAuth, requireAdmin, updateProgram);

/**
 * @route DELETE /api/v1/programs/:id
 * @desc Soft-deactivate a program
 * @access Admin only
 */
programRouter.delete('/:id', requireAuth, requireAdmin, deactivateProgram);

export default programRouter;
