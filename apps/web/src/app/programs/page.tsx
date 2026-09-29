import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { getPublicProgramsApi } from "@/lib/api/public";
import { AlertCircle, ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Training Programs",
  description: "Explore swimming and aquatic training programs for all skill levels and ages.",
};

export default async function ProgramsPage() {
  const { data: programs, error } = await getPublicProgramsApi();

  return (
    <main className="flex-1 py-12 md:py-16 bg-background text-foreground">
      <Container>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Badge variant="secondary">Program Catalogue</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Aquatic Programs
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Structured training courses designed for beginners, intermediate swimmers, and professional certification.
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive"
            >
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="flex-1">
                Unable to load programs right now. Please try again later.
              </div>
            </div>
          )}

          {/* Empty State */}
          {!error && programs && programs.length === 0 && (
            <Card className="text-center p-8 border-dashed border-border shadow-none">
              <CardContent className="pt-6 space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">No Programs Available</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  No active programs are currently published. New training sessions and curriculum details are being prepared.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Programs Grid */}
          {!error && programs && programs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((program) => (
                <Card key={program.id} className="flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                      {program.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground line-clamp-3">
                      {program.description || "No program description available."}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-4 border-t border-border">
                    <Link href={`/programs/${encodeURIComponent(program.slug)}`} className="w-full">
                      <Button variant="outline" className="w-full justify-between group">
                        <span>View Program Details</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
