import * as React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/container";

export function HeroSection() {
  return (
    <section className="py-12 md:py-20 bg-background text-foreground border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-left">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1.5 py-1 px-3">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span>Aquatic Education & Training</span>
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-foreground">
              Professional Swimming & Aquatic Training
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl">
              AquaCore provides structured swimming instruction, water safety education, and professional skill development in a safe, controlled environment.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link href="/programs">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <span>Explore Programs</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Contact Training Team
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Intentional Media Visual Placeholder */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md aspect-4/3 rounded-lg border border-border bg-muted/60 p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Waves className="h-6 w-6" />
                </div>
                <Badge variant="outline">AquaCore Platform</Badge>
              </div>

              <div className="space-y-2 my-auto py-4">
                <div className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                  Training Focus
                </div>
                <div className="text-lg font-bold text-foreground">
                  Skill Mastery & Safety First
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  From foundational water confidence to advanced stroke mechanics and emergency safety protocols.
                </p>
              </div>

              <div className="pt-3 border-t border-border/80 flex items-center justify-between text-xs text-muted-foreground">
                <span>Structured Progression</span>
                <span className="font-semibold text-primary">All Skill Levels</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
