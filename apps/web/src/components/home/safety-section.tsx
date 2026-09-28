import * as React from "react";
import { ShieldCheck, Compass, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";

const SAFETY_PILLARS = [
  {
    title: "Structured Progression",
    description: "Lessons follow step-by-step curriculum milestones adapted to individual skill progression.",
    icon: Compass,
  },
  {
    title: "Supervised Instruction",
    description: "Training is conducted with continuous instructor supervision and strict safety protocols.",
    icon: Users,
  },
  {
    title: "Water Safety First",
    description: "Core emphasis on emergency awareness, self-rescue techniques, and risk prevention.",
    icon: ShieldCheck,
  },
];

export function SafetySection() {
  return (
    <section className="py-12 md:py-20 bg-muted/30 text-foreground border-b border-border">
      <Container>
        <div className="flex flex-col items-center text-center gap-3 max-w-2xl mx-auto mb-10">
          <Badge variant="secondary">Quality & Standards</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Built on Safety & Instruction Standards
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Our training framework prioritizes safety, confidence, and methodical skill acquisition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {SAFETY_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.title} className="text-left">
                <CardHeader className="pb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground mb-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-base font-semibold">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
