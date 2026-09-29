import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Admin Control Panel',
  description: 'AquaCore administration control panel.',
};

export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <main className="flex-1 py-12 md:py-16 bg-muted/30">
        <Container>
          <Card className="max-w-2xl mx-auto shadow-sm border-primary/20">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                Admin Control Panel
              </CardTitle>
              <CardDescription>
                Welcome to the AquaCore administration portal. Restricted to authorized administrators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Protected administrative management area. System administration, course management, and booking confirmations will be added in upcoming project phases.
              </p>
            </CardContent>
          </Card>
        </Container>
      </main>
    </ProtectedRoute>
  );
}
