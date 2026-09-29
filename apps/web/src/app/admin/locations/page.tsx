import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { AdminLocationManager } from '@/components/admin/admin-location-manager';

export const metadata: Metadata = {
  title: 'Location Management | AquaCore Admin',
  description: 'Manage AquaCore training facilities, pools, and locations.',
};

export default function AdminLocationsPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <main className="flex-1 py-8 md:py-12 bg-muted/30">
        <Container>
          <AdminLocationManager />
        </Container>
      </main>
    </ProtectedRoute>
  );
}
