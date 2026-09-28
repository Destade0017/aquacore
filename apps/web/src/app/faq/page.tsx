import React from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Common questions regarding swimming lessons, scheduling, safety requirements, and certification.",
};

export default function FAQPage() {
  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <Card className="max-w-3xl mx-auto w-full">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Help & Information</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h1>
            <CardDescription className="text-muted-foreground text-sm md:text-base mt-1">
              General information regarding aquatic training, lesson policies, and certificate issuance.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-4 text-sm text-muted-foreground">
            <p>
              Answers to common questions will be updated as organisation policies are finalized.
            </p>
            <div className="p-4 rounded-md border border-border bg-muted text-xs">
              <span className="font-semibold text-foreground">FAQ Note:</span> Specific policy details and guidelines will be populated in future content phases.
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
