import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Container } from '@/components/layout/container';
import { LoginForm } from '@/components/auth/login-form';

export const metadata: Metadata = {
  title: 'Customer Login',
  description: 'Sign in to your AquaCore account to view your swimming programs and training courses.',
};

export default function LoginPage() {
  return (
    <main className="flex-1 py-12 md:py-20 flex items-center justify-center bg-muted/30">
      <Container>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </Container>
    </main>
  );
}

