import React from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the swimming and aquatic training organisation, mission, and safety standards.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <Card className="max-w-3xl mx-auto w-full">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Organisation Information</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              About AquaCore
            </h1>
            <CardDescription className="text-muted-foreground text-sm md:text-base mt-1">
              Professional swimming instruction, aquatic education, and water safety training.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-4 text-sm text-muted-foreground">
            <p>
              AquaCore provides structured swimming lessons and aquatic training programs for individuals and group sessions.
            </p>
            <div className="p-4 rounded-md border border-border bg-muted text-xs">
              <span className="font-semibold text-foreground">Section Status:</span> Full organisation history, instructor profiles, and operational standards are being prepared.
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
