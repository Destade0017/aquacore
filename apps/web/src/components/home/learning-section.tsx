import * as React from "react";
import Link from "next/link";
import { BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function LearningSection() {
  return (
    <section className="py-12 md:py-20 bg-muted/40 text-foreground border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-4">
            <Badge variant="secondary" className="w-fit">Educational Platform</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Online Learning & Coursework
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              In addition to practical pool sessions, AquaCore provides access to structured educational modules and theoretical safety resources to reinforce classroom learning.
            </p>

            <ul className="space-y-2.5 pt-2 text-sm text-foreground/90">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Self-paced theoretical modules and safety guidelines</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Course progress tracking and lesson resources</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Digital certificate verification upon course completion</span>
              </li>
            </ul>

            <div className="pt-4">
              <Link href="/courses">
                <Button variant="default" size="sm" className="gap-2">
                  <span>Browse Educational Courses</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-sm flex flex-col gap-4">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-accent text-accent-foreground">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Interactive Learning Portal</h3>
                  <p className="text-xs text-muted-foreground">Integrated educational modules</p>
                </div>
              </div>

              <div className="space-y-3 py-1">
                <div className="p-3 rounded border border-border bg-muted/60 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">Water Safety Fundamentals</span>
                  <Badge variant="success">Available</Badge>
                </div>
                <div className="p-3 rounded border border-border bg-muted/60 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">Aquatic Rescue Principles</span>
                  <Badge variant="outline">Theory Module</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
