import { Router } from 'express';
import {
  getActiveLocations,
  getAdminLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deactivateLocation,
} from '../modules/location/location.controller';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const locationRouter = Router();

/**
 * @route GET /api/v1/locations
 * @desc Get all active locations
 * @access Public
 */
locationRouter.get('/', getActiveLocations);

/**
 * @route GET /api/v1/locations/admin/all
 * @desc Get all locations including inactive ones
 * @access Admin only
 */
locationRouter.get('/admin/all', requireAuth, requireAdmin, getAdminLocations);

/**
 * @route GET /api/v1/locations/:id
 * @desc Get a single active location by ID
 * @access Public
 */
locationRouter.get('/:id', getLocationById);


/**
 * @route POST /api/v1/locations
 * @desc Create a new location
 * @access Admin only
 */
locationRouter.post('/', requireAuth, requireAdmin, createLocation);

/**
 * @route PATCH /api/v1/locations/:id
 * @desc Update an existing location
 * @access Admin only
 */
locationRouter.patch('/:id', requireAuth, requireAdmin, updateLocation);

/**
 * @route DELETE /api/v1/locations/:id
 * @desc Soft-deactivate a location
 * @access Admin only
 */
locationRouter.delete('/:id', requireAuth, requireAdmin, deactivateLocation);

export default locationRouter;
