import React from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the aquatic training organisation for inquiries and support.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 py-12 md:py-16">
      <Container>
        <Card className="max-w-3xl mx-auto w-full">
          <CardHeader className="border-b border-border pb-6">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">Inquiries & Support</Badge>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Contact AquaCore
            </h1>
            <CardDescription className="text-muted-foreground text-sm md:text-base mt-1">
              Have questions about swimming lessons or training courses? Reach out to our team.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col gap-4 text-sm text-muted-foreground">
            <p>
              Support channels and inquiry forms will be enabled as deployment parameters are configured.
            </p>
            <div className="p-4 rounded-md border border-border bg-muted text-xs">
              <span className="font-semibold text-foreground">Contact Note:</span> Official contact details and inquiry processing are configurable per organisation setup.
            </div>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
