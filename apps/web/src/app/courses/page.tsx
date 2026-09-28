import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Educational Courses",
  description: "Online and blended educational courses for aquatic safety, water rescue, and instruction.",
};

export default function CoursesPage() {
  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <Card className="max-w-3xl mx-auto w-full">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Learning & Education</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Educational Courses
            </h1>
            <CardDescription className="text-muted-foreground text-sm md:text-base mt-1">
              Online learning modules, theoretical safety training, and certification prep.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-4 text-sm text-muted-foreground">
            <p>
              Access learning materials, module progress tracking, and theoretical safety coursework.
            </p>
            <div className="p-4 rounded-md border border-border bg-muted text-xs flex flex-col gap-2">
              <div>
                <span className="font-semibold text-foreground">Route Testing Note:</span> Verify individual course detail page route structure below.
              </div>
              <div>
                <Link href="/courses/water-safety-fundamentals">
                  <Button variant="outline" size="sm">
                    View Example Course Details (/courses/water-safety-fundamentals)
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
