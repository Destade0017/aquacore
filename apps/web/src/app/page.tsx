import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export default function Home() {
  return (
    <main className="flex-1 py-12 md:py-20">
      <Container>
        <Card className="max-w-3xl mx-auto w-full">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Phase 2 — Task 3</Badge>
              <Badge variant="success">Layout Foundation Active</Badge>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
              Public Site Layout Shell
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm md:text-base">
              Reusable header, mobile navigation, page container, and footer foundation.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 flex flex-col gap-4 text-sm text-muted-foreground">
            <p>
              The structural layout shell for the public-facing AquaCore platform has been established.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Header with logo placeholder and primary navigation links</li>
              <li>Responsive mobile navigation dropdown with accessible controls</li>
              <li>Primary CTA placeholder (&quot;Book a Lesson&quot;)</li>
              <li>Centralized responsive <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">Container</code> primitive</li>
              <li>Footer foundation with legal, navigation, and program sections</li>
            </ul>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
