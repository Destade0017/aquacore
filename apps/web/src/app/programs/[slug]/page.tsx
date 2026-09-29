import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { getPublicProgramBySlugApi } from "@/lib/api/public";
import { AlertCircle, ArrowLeft, CheckCircle2 } from "lucide-react";

interface DynamicSlugProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: DynamicSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: program } = await getPublicProgramBySlugApi(slug);

  if (!program) {
    const formattedTitle = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      title: `${formattedTitle} — Program`,
      description: "AquaCore aquatic training program details.",
    };
  }

  return {
    title: `${program.name} | AquaCore`,
    description: program.description || `Detailed overview and training structure for ${program.name}.`,
  };
}

export default async function ProgramDetailPage({ params }: DynamicSlugProps) {
  const { slug } = await params;
  const { data: program, notFound: isNotFound, error } = await getPublicProgramBySlugApi(slug);

  if (isNotFound) {
    notFound();
  }

  return (
    <main className="flex-1 py-12 md:py-16 bg-background text-foreground">
      <Container>
        <div className="max-w-3xl mx-auto space-y-6">
          <Link
            href="/programs"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Programs
          </Link>

          {/* Error State */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive"
            >
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="flex-1">
                Unable to load program details right now. Please try again later.
              </div>
            </div>
          )}

          {/* Program Content */}
          {program && (
            <Card className="shadow-sm">
              <CardHeader className="border-b border-border pb-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Active Program</Badge>
                  <Badge variant="outline" className="font-mono text-xs">
                    {program.slug}
                  </Badge>
                </div>
                <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
                  {program.name}
                </CardTitle>
                {program.description && (
                  <CardDescription className="text-base text-muted-foreground">
                    {program.description}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-6 space-y-6 text-sm text-muted-foreground">
                <div className="space-y-3">
                  <h2 className="text-base font-semibold text-foreground">Program Overview</h2>
                  <p className="leading-relaxed">
                    This structured program is part of the official AquaCore aquatic curriculum. All sessions adhere to professional safety and instructional guidelines.
                  </p>
                </div>

                <div className="p-4 rounded-lg border border-border bg-muted/50 space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Configured AquaCore Offering</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enrollment and scheduling options for this program are managed dynamically by AquaCore instructors and administration.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link href="/locations" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full">
                    View Available Locations
                  </Button>
                </Link>
                <Link href="/auth/login" className="w-full sm:w-auto">
                  <Button className="w-full">
                    Sign In to Enroll
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )}
        </div>
      </Container>
    </main>
  );
}
