import { AuthUser } from '@/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

/**
 * Fetch currently authenticated user profile from backend.
 * Uses credentials: "include" to send HttpOnly access_token cookie.
 */
export async function getCurrentUserApi(): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (res.status === 401) {
      return null;
    }

    if (!res.ok) {
      return null;
    }

    const body: ApiResponse<{ user: AuthUser }> = await res.json();

    if (body.success && body.data?.user) {
      return body.data.user;
    }

    return null;
  } catch {
    // Network or server error fallback - handle gracefully without crashing
    return null;
  }
}

/**
 * Log out user by calling backend logout API endpoint.
 * Uses credentials: "include" so backend can clear HttpOnly cookie.
 */
export async function logoutApi(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    return res.ok;
  } catch {
    return false;
  }
}
