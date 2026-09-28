import * as React from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function LocationsSection() {
  return (
    <section className="py-12 md:py-20 bg-background text-foreground border-b border-border">
      <Container>
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-4">
          <Badge variant="secondary">Facility Access</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Training Locations & Facilities
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Practical swimming and aquatic training sessions take place at designated partner pools and aquatic facilities, selected for safety, clean water maintenance, and controlled learning environments.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <Link href="/locations">
              <Button variant="outline" size="sm" className="gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>View Training Locations</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
