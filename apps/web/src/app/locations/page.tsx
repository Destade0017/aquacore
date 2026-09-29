import React from "react";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";
import { getPublicLocationsApi, formatLocationType } from "@/lib/api/public";
import { AlertCircle, MapPin, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Training Locations",
  description: "Find aquatic training facilities, pools, and training centers.",
};

export default async function LocationsPage() {
  const { data: locations, error } = await getPublicLocationsApi();

  return (
    <main className="flex-1 py-12 md:py-16 bg-background text-foreground">
      <Container>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Badge variant="secondary">Facilities & Pools</Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Training Locations
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              Affiliated swimming pools and aquatic facilities used for lesson delivery and certification.
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
                Unable to load locations right now. Please try again later.
              </div>
            </div>
          )}

          {/* Empty State */}
          {!error && locations && locations.length === 0 && (
            <Card className="text-center p-8 border-dashed border-border shadow-none">
              <CardContent className="pt-6 space-y-3">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <Building2 className="w-6 h-6" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">No Locations Listed</h2>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  No active training locations are currently listed. Facilities and partner pools will be displayed as training sessions are scheduled.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Locations Grid */}
          {!error && locations && locations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locations.map((loc) => {
                const locationAddress = [loc.address, loc.city, loc.state]
                  .filter(Boolean)
                  .join(", ");

                return (
                  <Card key={loc.id} className="flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{formatLocationType(loc.type)}</Badge>
                      </div>
                      <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                        {loc.name}
                      </CardTitle>
                      {locationAddress && (
                        <div className="flex items-start gap-2 text-xs text-muted-foreground pt-1">
                          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary" />
                          <span>{locationAddress}</span>
                        </div>
                      )}
                    </CardHeader>
                    {loc.description && (
                      <CardContent className="pt-0 text-sm text-muted-foreground">
                        <p className="line-clamp-3">{loc.description}</p>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
