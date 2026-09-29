import { LocationType } from './public';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export interface AdminLocation {
  id: string;
  name: string;
  type: LocationType;
  address: string | null;
  city: string | null;
  state: string | null;
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

export interface CreateLocationInput {
  name: string;
  type: LocationType;
  address?: string;
  city?: string;
  state?: string;
  description?: string;
}

export interface UpdateLocationInput {
  name?: string;
  type?: LocationType;
  address?: string;
  city?: string;
  state?: string;
  description?: string;
  isActive?: boolean;
}

/**
 * Fetch all locations (active and inactive) for admin management.
 */
export async function getAdminLocationsApi(): Promise<{
  data: AdminLocation[] | null;
  error: string | null;
  unauthorized?: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/locations/admin/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (res.status === 401 || res.status === 403) {
      return { data: null, error: 'Unauthorized', unauthorized: true };
    }

    if (!res.ok) {
      return { data: null, error: 'Failed to load locations' };
    }

    const body: AdminApiResponse<{ locations: AdminLocation[] }> = await res.json();
    if (body.success && Array.isArray(body.data?.locations)) {
      return { data: body.data.locations, error: null };
    }

    return { data: null, error: 'Invalid response format' };
  } catch {
    return { data: null, error: 'Unable to connect to server' };
  }
}

/**
 * Create a new location (Admin only).
 */
export async function createAdminLocationApi(input: CreateLocationInput): Promise<{
  success: boolean;
  location?: AdminLocation;
  errorCode?: string;
  errorMessage?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/locations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(input),
    });

    const body: AdminApiResponse<{ location: AdminLocation }> = await res.json().catch(() => ({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Unexpected server error' },
    }));

    if (res.ok && body.success && body.data?.location) {
      return { success: true, location: body.data.location };
    }

    if (body.error?.code === 'INVALID_LOCATION_TYPE') {
      return {
        success: false,
        errorCode: 'INVALID_LOCATION_TYPE',
        errorMessage: 'Please select a valid location type.',
      };
    }

    return {
      success: false,
      errorCode: body.error?.code || 'CREATE_ERROR',
      errorMessage: body.error?.message || 'Failed to create location.',
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
 * Update an existing location (Admin only).
 */
export async function updateAdminLocationApi(id: string, input: UpdateLocationInput): Promise<{
  success: boolean;
  location?: AdminLocation;
  errorCode?: string;
  errorMessage?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/locations/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(input),
    });

    const body: AdminApiResponse<{ location: AdminLocation }> = await res.json().catch(() => ({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Unexpected server error' },
    }));

    if (res.ok && body.success && body.data?.location) {
      return { success: true, location: body.data.location };
    }

    if (body.error?.code === 'INVALID_LOCATION_TYPE') {
      return {
        success: false,
        errorCode: 'INVALID_LOCATION_TYPE',
        errorMessage: 'Please select a valid location type.',
      };
    }

    return {
      success: false,
      errorCode: body.error?.code || 'UPDATE_ERROR',
      errorMessage: body.error?.message || 'Failed to update location.',
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
 * Soft deactivate a location (Admin only).
 */
export async function deactivateAdminLocationApi(id: string): Promise<{
  success: boolean;
  location?: AdminLocation;
  errorMessage?: string;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/locations/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    const body: AdminApiResponse<{ location: AdminLocation }> = await res.json().catch(() => ({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'Unexpected server error' },
    }));

    if (res.ok && body.success && body.data?.location) {
      return { success: true, location: body.data.location };
    }

    return {
      success: false,
      errorMessage: body.error?.message || 'Failed to deactivate location.',
    };
  } catch {
    return {
      success: false,
      errorMessage: 'Unable to connect to server. Please try again.',
    };
  }
}
