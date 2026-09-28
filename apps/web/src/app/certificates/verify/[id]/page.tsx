import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

interface CertificateVerifyProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: CertificateVerifyProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Verify Certificate ${id}`,
    description: `Public certificate verification page for certificate identifier ${id}.`,
  };
}

export default async function CertificateVerifyPage({ params }: CertificateVerifyProps) {
  const { id } = await params;

  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <Card className="max-w-3xl mx-auto w-full">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Certificate Verification</Badge>
              <Badge variant="outline">ID: {id}</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Certificate Verification
            </h1>
            <CardDescription className="text-muted-foreground text-sm md:text-base mt-1">
              Public verification status for certificate identifier: <code className="font-mono text-foreground font-semibold">{id}</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-4 text-sm text-muted-foreground">
            <p>
              Verification structure is initialized. Backend lookup and validation will be integrated in future steps.
            </p>
            <div className="p-4 rounded-md border border-border bg-muted text-xs flex items-center justify-between">
              <span>Dynamic verification route confirmed (<code className="font-mono bg-background px-1.5 py-0.5 rounded">/certificates/verify/[id]</code>).</span>
              <Link href="/certificates">
                <Button variant="ghost" size="sm">Back to Certificates</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
