import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Certificates & Verification",
  description: "Verify digital certificates and learn about aquatic training credentials.",
};

export default function CertificatesPage() {
  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <Card className="max-w-3xl mx-auto w-full">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Digital Credentials</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Certificates & Verification
            </h1>
            <CardDescription className="text-muted-foreground text-sm md:text-base mt-1">
              Public verification service for digital certificates issued by AquaCore.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-4 text-sm text-muted-foreground">
            <p>
              Issued certificates include a unique identifier that can be verified online by employers and organisations.
            </p>
            <div className="p-4 rounded-md border border-border bg-muted text-xs flex flex-col gap-2">
              <div>
                <span className="font-semibold text-foreground">Route Testing Note:</span> Verify individual certificate verification dynamic route structure below.
              </div>
              <div>
                <Link href="/certificates/verify/CERT-2026-9901">
                  <Button variant="outline" size="sm">
                    View Verification Portal Sample (/certificates/verify/CERT-2026-9901)
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
