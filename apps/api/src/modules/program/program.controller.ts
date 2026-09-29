import { Request, Response, NextFunction } from 'express';
import prisma from '../../config/prisma';
import { AppError } from '../../middleware/error-handler';

/**
 * GET /api/v1/programs
 * Public endpoint to list all active programs.
 */
export const getActivePrograms = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const programs = await prisma.program.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: { programs },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/v1/programs/admin/all
 * Admin-only endpoint to list all programs (both active and inactive).
 */
export const getAdminPrograms = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const programs = await prisma.program.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: { programs },
    });
  } catch (err) {
    next(err);
  }
};


/**
 * GET /api/v1/programs/:slug
 * Public endpoint to retrieve a single active program by slug.
 */
export const getProgramBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { slug } = req.params;

    if (!slug || typeof slug !== 'string') {
      throw new AppError('Program slug is required', 400, 'VALIDATION_ERROR');
    }

    const program = await prisma.program.findFirst({
      where: {
        slug: slug.trim().toLowerCase(),
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!program) {
      throw new AppError('Program not found', 404, 'PROGRAM_NOT_FOUND');
    }

    res.status(200).json({
      success: true,
      data: { program },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/v1/programs
 * Admin-only endpoint to create a new program.
 */
export const createProgram = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, slug, description } = req.body || {};

    if (!name || typeof name !== 'string' || !name.trim()) {
      throw new AppError('Program name is required', 400, 'VALIDATION_ERROR');
    }

    if (!slug || typeof slug !== 'string' || !slug.trim()) {
      throw new AppError('Program slug is required', 400, 'VALIDATION_ERROR');
    }

    const normalizedName = name.trim();
    const normalizedSlug = slug.trim().toLowerCase();
    const normalizedDescription = typeof description === 'string' ? description.trim() : null;

    // Uniqueness check for slug
    const existingProgram = await prisma.program.findUnique({
      where: { slug: normalizedSlug },
    });

    if (existingProgram) {
      throw new AppError('A program with this slug already exists', 409, 'PROGRAM_SLUG_ALREADY_EXISTS');
    }

    const program = await prisma.program.create({
      data: {
        name: normalizedName,
        slug: normalizedSlug,
        description: normalizedDescription,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Program created successfully',
      data: { program },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/v1/programs/:id
 * Admin-only endpoint to update an existing program.
 */
export const updateProgram = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, slug, description, isActive } = req.body || {};

    if (!id || typeof id !== 'string') {
      throw new AppError('Program ID is required', 400, 'VALIDATION_ERROR');
    }

    const existingProgram = await prisma.program.findUnique({
      where: { id },
    });

    if (!existingProgram) {
      throw new AppError('Program not found', 404, 'PROGRAM_NOT_FOUND');
    }

    const updateData: {
      name?: string;
      slug?: string;
      description?: string | null;
      isActive?: boolean;
    } = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || !name.trim()) {
        throw new AppError('Program name cannot be empty', 400, 'VALIDATION_ERROR');
      }
      updateData.name = name.trim();
    }

    if (slug !== undefined) {
      if (typeof slug !== 'string' || !slug.trim()) {
        throw new AppError('Program slug cannot be empty', 400, 'VALIDATION_ERROR');
      }
      const normalizedSlug = slug.trim().toLowerCase();

      if (normalizedSlug !== existingProgram.slug) {
        const slugConflict = await prisma.program.findUnique({
          where: { slug: normalizedSlug },
        });

        if (slugConflict && slugConflict.id !== id) {
          throw new AppError('A program with this slug already exists', 409, 'PROGRAM_SLUG_ALREADY_EXISTS');
        }

        updateData.slug = normalizedSlug;
      }
    }

    if (description !== undefined) {
      updateData.description = typeof description === 'string' ? description.trim() : null;
    }

    if (isActive !== undefined) {
      if (typeof isActive !== 'boolean') {
        throw new AppError('isActive must be a boolean', 400, 'VALIDATION_ERROR');
      }
      updateData.isActive = isActive;
    }

    const updatedProgram = await prisma.program.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Program updated successfully',
      data: { program: updatedProgram },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/v1/programs/:id
 * Admin-only endpoint to soft-deactivate a program.
 */
export const deactivateProgram = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      throw new AppError('Program ID is required', 400, 'VALIDATION_ERROR');
    }

    const existingProgram = await prisma.program.findUnique({
      where: { id },
    });

    if (!existingProgram) {
      throw new AppError('Program not found', 404, 'PROGRAM_NOT_FOUND');
    }

    const deactivatedProgram = await prisma.program.update({
      where: { id },
      data: { isActive: false },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Program deactivated successfully',
      data: { program: deactivatedProgram },
    });
  } catch (err) {
    next(err);
  }
};
