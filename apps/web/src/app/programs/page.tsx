import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Training Programs",
  description: "Explore swimming and aquatic training programs for all skill levels and ages.",
};

export default function ProgramsPage() {
  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <Card className="max-w-3xl mx-auto w-full">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Program Catalogue</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Aquatic Programs
            </h1>
            <CardDescription className="text-muted-foreground text-sm md:text-base mt-1">
              Structured training courses designed for beginners, intermediate swimmers, and professional certification.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-4 text-sm text-muted-foreground">
            <p>
              Discover available swimming lessons, water safety courses, and specialized aquatic training.
            </p>
            <div className="p-4 rounded-md border border-border bg-muted text-xs flex flex-col gap-2">
              <div>
                <span className="font-semibold text-foreground">Route Testing Note:</span> Verify individual program page route structure below.
              </div>
              <div>
                <Link href="/programs/swimming-essentials">
                  <Button variant="outline" size="sm">
                    View Example Program Details (/programs/swimming-essentials)
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
