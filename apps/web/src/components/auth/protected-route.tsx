'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { UserRole } from '@/types/auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { status, user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Wait until auth status finishes loading before evaluating redirects
    if (status === 'loading') return;

    if (!isAuthenticated || !user) {
      const loginUrl = pathname
        ? `/auth/login?next=${encodeURIComponent(pathname)}`
        : '/auth/login';
      router.replace(loginUrl);
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      // Non-admin user trying to access admin route redirects to /dashboard
      if (requiredRole === 'ADMIN' && user.role !== 'ADMIN') {
        router.replace('/dashboard');
      }
    }
  }, [status, isAuthenticated, user, requiredRole, router, pathname]);

  if (status === 'loading') {
    return (
      <div className="flex-1 flex items-center justify-center py-24" aria-live="polite" aria-busy="true">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
