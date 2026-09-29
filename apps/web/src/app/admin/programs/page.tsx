import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { AdminProgramManager } from '@/components/admin/admin-program-manager';

export const metadata: Metadata = {
  title: 'Program Management | AquaCore Admin',
  description: 'Manage AquaCore aquatic training programs and offerings.',
};

export default function AdminProgramsPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <main className="flex-1 py-8 md:py-12 bg-muted/30">
        <Container>
          <AdminProgramManager />
        </Container>
      </main>
    </ProtectedRoute>
  );
}
