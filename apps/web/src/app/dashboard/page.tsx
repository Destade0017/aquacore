import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Customer Dashboard',
  description: 'AquaCore customer training dashboard.',
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <main className="flex-1 py-12 md:py-16 bg-muted/30">
        <Container>
          <Card className="max-w-2xl mx-auto shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
                Customer Dashboard
              </CardTitle>
              <CardDescription>
                Welcome to your AquaCore customer area. This protected route foundation is active and verified.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Protected customer portal area. Detailed program schedules, course progress, and booking management will be added in upcoming project phases.
              </p>
            </CardContent>
          </Card>
        </Container>
      </main>
    </ProtectedRoute>
  );
}
