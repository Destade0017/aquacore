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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  user?: AuthUser;
  errorCode?: string;
  errorMessage?: string;
}

/**
 * Log in user by calling backend POST /api/v1/auth/login endpoint.
 * Uses credentials: "include" so backend can set HttpOnly access_token cookie.
 */
export async function loginApi(credentials: LoginCredentials): Promise<LoginResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    const body: ApiResponse<{ user: AuthUser }> = await res.json().catch(() => ({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'An unexpected server error occurred.' },
    }));

    if (res.ok && body.success && body.data?.user) {
      return {
        success: true,
        user: body.data.user,
      };
    }

    return {
      success: false,
      errorCode: body.error?.code || 'AUTH_ERROR',
      errorMessage: body.error?.message || 'Invalid email or password.',
    };
  } catch {
    return {
      success: false,
      errorCode: 'NETWORK_ERROR',
      errorMessage: 'Unable to connect to the server. Please check your network connection and try again.',
    };
  }
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResult {
  success: boolean;
  user?: AuthUser;
  errorCode?: string;
  errorMessage?: string;
}

/**
 * Register a new customer account via backend POST /api/v1/auth/register endpoint.
 */
export async function registerApi(data: RegisterData): Promise<RegisterResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    const body: ApiResponse<{ user: AuthUser }> = await res.json().catch(() => ({
      success: false,
      error: { code: 'SERVER_ERROR', message: 'An unexpected server error occurred.' },
    }));

    if (res.ok && body.success && body.data?.user) {
      return {
        success: true,
        user: body.data.user,
      };
    }

    if (body.error?.code === 'EMAIL_ALREADY_EXISTS') {
      return {
        success: false,
        errorCode: 'EMAIL_ALREADY_EXISTS',
        errorMessage: 'An account with this email address already exists. Please sign in instead.',
      };
    }

    return {
      success: false,
      errorCode: body.error?.code || 'REGISTRATION_ERROR',
      errorMessage: body.error?.message || 'Unable to create your account right now. Please try again.',
    };
  } catch {
    return {
      success: false,
      errorCode: 'NETWORK_ERROR',
      errorMessage: 'Unable to connect to the server. Please check your network connection and try again.',
    };
  }
}


