const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export interface AdminProgram {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AdminApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface CreateProgramInput {
  name: string;
  slug: string;
  description?: string;
}

export interface UpdateProgramInput {
  name?: string;
  slug?: string;
  description?: string;
  isActive?: boolean;
}

/**
 * Fetch all programs (active and inactive) for admin management.
 */
export async function getAdminProgramsApi(): Promise<{
  data: AdminProgram[] | null;
  error: string | null;
  unauthorized?: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/programs/admin/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (res.status === 401 || res.status === 403) {
      return { data: null, error: 'Unauthorized', unauthorized: true };
    }

    if (!res.ok) {
      return { data: null, error: 'Failed to load programs' };
    }

    const body: AdminApiResponse<{ programs: AdminProgram[] }> = await res.json();
    if (body.success && Array.isArray(body.data?.programs)) {
      return { data: body.data.programs, error: null };
    }

    return { data: null, error: 'Invalid response format' };
  } catch {
    return { data: null, error: 'Unable to connect to server' };
  }
}

/**
 * Create a new program (Admin only).
 */
export async function createAdminProgramApi(input: CreateProgramInput): Promise<{
  success: boolean;
  program?: AdminProgram;
  errorCode?: string;
  errorMessage?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/programs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(input),
    });

    const body: AdminApiResponse<{ program: AdminProgram }> = await res.json().catch(() => ({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Unexpected server error' },
    }));

    if (res.ok && body.success && body.data?.program) {
      return { success: true, program: body.data.program };
    }

    if (body.error?.code === 'PROGRAM_SLUG_ALREADY_EXISTS') {
      return {
        success: false,
        errorCode: 'PROGRAM_SLUG_ALREADY_EXISTS',
        errorMessage: 'A program with this slug already exists. Please choose a unique slug.',
      };
    }

    return {
      success: false,
      errorCode: body.error?.code || 'CREATE_ERROR',
      errorMessage: body.error?.message || 'Failed to create program.',
    };
  } catch {
    return {
      success: false,
      errorCode: 'NETWORK_ERROR',
      errorMessage: 'Unable to connect to server. Please try again.',
    };
  }
}

/**
 * Update an existing program (Admin only).
 */
export async function updateAdminProgramApi(id: string, input: UpdateProgramInput): Promise<{
  success: boolean;
  program?: AdminProgram;
  errorCode?: string;
  errorMessage?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/programs/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(input),
    });

    const body: AdminApiResponse<{ program: AdminProgram }> = await res.json().catch(() => ({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Unexpected server error' },
    }));

    if (res.ok && body.success && body.data?.program) {
      return { success: true, program: body.data.program };
    }

    if (body.error?.code === 'PROGRAM_SLUG_ALREADY_EXISTS') {
      return {
        success: false,
        errorCode: 'PROGRAM_SLUG_ALREADY_EXISTS',
        errorMessage: 'A program with this slug already exists. Please choose a unique slug.',
      };
    }

    return {
      success: false,
      errorCode: body.error?.code || 'UPDATE_ERROR',
      errorMessage: body.error?.message || 'Failed to update program.',
    };
  } catch {
    return {
      success: false,
      errorCode: 'NETWORK_ERROR',
      errorMessage: 'Unable to connect to server. Please try again.',
    };
  }
}

/**
 * Soft deactivate a program (Admin only).
 */
export async function deactivateAdminProgramApi(id: string): Promise<{
  success: boolean;
  program?: AdminProgram;
  errorMessage?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/programs/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const body: AdminApiResponse<{ program: AdminProgram }> = await res.json().catch(() => ({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Unexpected server error' },
    }));

    if (res.ok && body.success && body.data?.program) {
      return { success: true, program: body.data.program };
    }

    return {
      success: false,
      errorMessage: body.error?.message || 'Failed to deactivate program.',
    };
  } catch {
    return {
      success: false,
      errorMessage: 'Unable to connect to server. Please try again.',
    };
  }
}
