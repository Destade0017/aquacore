import React from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Training Locations",
  description: "Find aquatic training facilities, pools, and training centers.",
};

export default function LocationsPage() {
  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <Card className="max-w-3xl mx-auto w-full">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Facilities & Pools</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Training Locations
            </h1>
            <CardDescription className="text-muted-foreground text-sm md:text-base mt-1">
              Affiliated swimming pools and aquatic facilities used for lesson delivery.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-4 text-sm text-muted-foreground">
            <p>
              Locations and facility details are managed dynamically according to scheduled training sessions.
            </p>
            <div className="p-4 rounded-md border border-border bg-muted text-xs">
              <span className="font-semibold text-foreground">Section Status:</span> Specific facility listings and directions are configurable per deployment.
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
