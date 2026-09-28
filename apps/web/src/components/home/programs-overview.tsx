import * as React from "react";
import Link from "next/link";
import { Waves, ShieldCheck, GraduationCap, Award, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

const PROGRAM_CATEGORIES = [
  {
    title: "Swimming Lessons",
    description: "Structured instruction for learners developing core stroke mechanics, breath control, and water buoyancy.",
    icon: Waves,
    tag: "Practical Training",
    link: "/programs",
  },
  {
    title: "Aquatic Safety Education",
    description: "Water safety principles, hazard awareness, and preventative rescue protocols for participants of all ages.",
    icon: ShieldCheck,
    tag: "Safety & Awareness",
    link: "/programs",
  },
  {
    title: "Educational Courses",
    description: "Theoretical course modules, self-paced learning, and classroom safety preparation.",
    icon: GraduationCap,
    tag: "Online & Theory",
    link: "/courses",
  },
  {
    title: "Professional Skills",
    description: "Advanced skill development for individuals preparing for specialized aquatic qualifications and certifications.",
    icon: Award,
    tag: "Skill Advancement",
    link: "/programs",
  },
];

export function ProgramsOverview() {
  return (
    <section className="py-12 md:py-20 bg-background text-foreground border-b border-border">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="flex flex-col gap-2 max-w-xl">
            <Badge variant="secondary" className="w-fit">Training Categories</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Major Training Programs
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Explore our core training divisions designed to build aquatic competence, safety, and mastery.
            </p>
          </div>
          <Link href="/programs">
            <Button variant="outline" size="sm" className="gap-1.5 w-fit">
              <span>View All Programs</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAM_CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.title} className="flex flex-col justify-between transition-colors hover:border-primary/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {category.tag}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-semibold">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col justify-between flex-1 gap-4">
                  <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                    {category.description}
                  </CardDescription>
                  <Link href={category.link} className="mt-auto">
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-primary hover:bg-transparent hover:underline text-xs font-semibold gap-1">
                      <span>Learn More</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
