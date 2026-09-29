import { Request, Response, NextFunction } from 'express';
import { LocationType } from '@prisma/client';
import prisma from '../../config/prisma';
import { AppError } from '../../middleware/error-handler';

/**
 * GET /api/v1/locations
 * Public endpoint to list all active locations ordered by name.
 */
export const getActiveLocations = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const locations = await prisma.location.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        type: true,
        address: true,
        city: true,
        state: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { name: 'asc' },
    });

    res.status(200).json({
      success: true,
      data: { locations },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/v1/locations/admin/all
 * Admin-only endpoint to list all locations (both active and inactive).
 */
export const getAdminLocations = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const locations = await prisma.location.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        address: true,
        city: true,
        state: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: { locations },
    });
  } catch (err) {
    next(err);
  }
};


/**
 * GET /api/v1/locations/:id
 * Public endpoint to retrieve a single active location by ID.
 */
export const getLocationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      throw new AppError('Location ID is required', 400, 'VALIDATION_ERROR');
    }

    const location = await prisma.location.findFirst({
      where: {
        id,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        type: true,
        address: true,
        city: true,
        state: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!location) {
      throw new AppError('Location not found', 404, 'LOCATION_NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: { location },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/v1/locations
 * Admin-only endpoint to create a new location.
 */
export const createLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, type, address, city, state, description } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      throw new AppError('Location name is required', 400, 'VALIDATION_ERROR');
    }

    if (!type || typeof type !== 'string' || !Object.values(LocationType).includes(type as LocationType)) {
      throw new AppError('Valid location type is required', 400, 'INVALID_LOCATION_TYPE');
    }

    const location = await prisma.location.create({
      data: {
        name: name.trim(),
        type: type as LocationType,
        address: typeof address === 'string' && address.trim() ? address.trim() : null,
        city: typeof city === 'string' && city.trim() ? city.trim() : null,
        state: typeof state === 'string' && state.trim() ? state.trim() : null,
        description: typeof description === 'string' && description.trim() ? description.trim() : null,
      },
      select: {
        id: true,
        name: true,
        type: true,
        address: true,
        city: true,
        state: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Location created successfully',
      data: { location },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/v1/locations/:id
 * Admin-only endpoint to update an existing location.
 */
export const updateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, type, address, city, state, description, isActive } = req.body || {};

    if (!id || typeof id !== 'string') {
      throw new AppError('Location ID is required', 400, 'VALIDATION_ERROR');
    }

    const existingLocation = await prisma.location.findUnique({
      where: { id },
    });

    if (!existingLocation) {
      throw new AppError('Location not found', 404, 'LOCATION_NOT_FOUND');
    }

    const updateData: {
      name?: string;
      type?: LocationType;
      address?: string | null;
      city?: string | null;
      state?: string | null;
      description?: string | null;
      isActive?: boolean;
    } = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || !name.trim()) {
        throw new AppError('Location name cannot be empty', 400, 'VALIDATION_ERROR');
      }
      updateData.name = name.trim();
    }

    if (type !== undefined) {
      if (typeof type !== 'string' || !Object.values(LocationType).includes(type as LocationType)) {
        throw new AppError('Invalid location type', 400, 'INVALID_LOCATION_TYPE');
      }
      updateData.type = type as LocationType;
    }

    if (address !== undefined) {
      updateData.address = typeof address === 'string' && address.trim() ? address.trim() : null;
    }

    if (city !== undefined) {
      updateData.city = typeof city === 'string' && city.trim() ? city.trim() : null;
    }

    if (state !== undefined) {
      updateData.state = typeof state === 'string' && state.trim() ? state.trim() : null;
    }

    if (description !== undefined) {
      updateData.description = typeof description === 'string' && description.trim() ? description.trim() : null;
    }

    if (isActive !== undefined) {
      if (typeof isActive !== 'boolean') {
        throw new AppError('isActive must be a boolean', 400, 'VALIDATION_ERROR');
      }
      updateData.isActive = isActive;
    }

    const updatedLocation = await prisma.location.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        type: true,
        address: true,
        city: true,
        state: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Location updated successfully',
      data: { location: updatedLocation },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/v1/locations/:id
 * Admin-only endpoint to soft-deactivate a location.
 */
export const deactivateLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      throw new AppError('Location ID is required', 400, 'VALIDATION_ERROR');
    }

    const existingLocation = await prisma.location.findUnique({
      where: { id },
    });

    if (!existingLocation) {
      throw new AppError('Location not found', 404, 'LOCATION_NOT_FOUND');
    }

    const deactivatedLocation = await prisma.location.update({
      where: { id },
      data: { isActive: false },
      select: {
        id: true,
        name: true,
        type: true,
        address: true,
        city: true,
        state: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Location deactivated successfully',
      data: { location: deactivatedLocation },
    });
  } catch (err) {
    next(err);
  }
};
