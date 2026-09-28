import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

interface DynamicSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DynamicSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedTitle} — Program Details`,
    description: `Detailed information and training structure for ${formattedTitle}.`,
  };
}

export default async function ProgramDetailPage({ params }: DynamicSlugProps) {
  const { slug } = await params;
  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <Card className="max-w-3xl mx-auto w-full">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Program Details</Badge>
              <Badge variant="outline">Slug: {slug}</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {formattedTitle}
            </h1>
            <CardDescription className="text-muted-foreground text-sm md:text-base mt-1">
              Program overview, prerequisites, and booking requirements.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-4 text-sm text-muted-foreground">
            <p>
              Detailed information for <strong className="text-foreground">{formattedTitle}</strong> is currently being prepared.
            </p>
            <div className="p-4 rounded-md border border-border bg-muted text-xs flex items-center justify-between">
              <span>Dynamic route structure verified (<code className="font-mono bg-background px-1.5 py-0.5 rounded">/programs/[slug]</code>).</span>
              <Link href="/programs">
                <Button variant="ghost" size="sm">Back to Programs</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
