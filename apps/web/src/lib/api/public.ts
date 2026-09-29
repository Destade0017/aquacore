const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export interface ProgramData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export type LocationType =
  | 'PARTNER_POOL'
  | 'HOTEL_POOL'
  | 'TRAINING_CENTRE'
  | 'CLIENT_PRIVATE_POOL'
  | 'OTHER';

export interface LocationData {
  id: string;
  name: string;
  type: LocationType;
  address: string | null;
  city: string | null;
  state: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PublicApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Fetch all active public programs.
 */
export async function getPublicProgramsApi(): Promise<{
  data: ProgramData[] | null;
  error: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/programs`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return { data: null, error: true };
    }

    const body: PublicApiResponse<{ programs: ProgramData[] }> = await res.json();
    if (body.success && Array.isArray(body.data?.programs)) {
      return { data: body.data.programs, error: false };
    }

    return { data: null, error: true };
  } catch {
    return { data: null, error: true };
  }
}

/**
 * Fetch a single active public program by slug.
 */
export async function getPublicProgramBySlugApi(slug: string): Promise<{
  data: ProgramData | null;
  notFound: boolean;
  error: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/programs/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });

    if (res.status === 404) {
      return { data: null, notFound: true, error: false };
    }

    if (!res.ok) {
      return { data: null, notFound: false, error: true };
    }

    const body: PublicApiResponse<{ program: ProgramData }> = await res.json();
    if (body.success && body.data?.program) {
      return { data: body.data.program, notFound: false, error: false };
    }

    return { data: null, notFound: true, error: false };
  } catch {
    return { data: null, notFound: false, error: true };
  }
}

/**
 * Fetch all active public locations.
 */
export async function getPublicLocationsApi(): Promise<{
  data: LocationData[] | null;
  error: boolean;
}> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/locations`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return { data: null, error: true };
    }

    const body: PublicApiResponse<{ locations: LocationData[] }> = await res.json();
    if (body.success && Array.isArray(body.data?.locations)) {
      return { data: body.data.locations, error: false };
    }

    return { data: null, error: true };
  } catch {
    return { data: null, error: true };
  }
}

/**
 * Format LocationType enum into human-readable label.
 */
export function formatLocationType(type: LocationType): string {
  switch (type) {
    case 'TRAINING_CENTRE':
      return 'Training Centre';
    case 'PARTNER_POOL':
      return 'Partner Pool';
    case 'HOTEL_POOL':
      return 'Hotel Pool';
    case 'CLIENT_PRIVATE_POOL':
      return 'Private Pool';
    case 'OTHER':
    default:
      return 'Facility';
  }
}
