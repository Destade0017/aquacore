import type { Metadata } from 'next';
import { Container } from '@/components/layout/container';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Customer Registration',
  description: 'Create an AquaCore account to register for swimming lessons, training programs, and educational courses.',
};

export default function RegisterPage() {
  return (
    <main className="flex-1 py-12 md:py-20 flex items-center justify-center bg-muted/30">
      <Container>
        <RegisterForm />
      </Container>
    </main>
  );
}
