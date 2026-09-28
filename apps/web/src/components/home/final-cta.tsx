import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function FinalCTA() {
  return (
    <section className="py-12 md:py-20 bg-background text-foreground">
      <Container>
        <Card className="max-w-4xl mx-auto bg-card border border-border shadow-sm text-center">
          <CardHeader className="py-10 px-6 sm:px-12">
            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Ready to Start Aquatic Training?
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mt-2">
              Explore available swimming programs or reach out to our team to find the right training path for you or your group.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10 pt-0 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/programs">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <span>Browse Programs</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}
