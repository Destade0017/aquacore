"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log non-sensitive error metadata in development if needed
  }, [error]);

  return (
    <main className="flex-1 py-16 md:py-24 flex items-center justify-center">
      <Container>
        <Card className="max-w-md mx-auto w-full text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-2">
              <Badge variant="warning">System Notice</Badge>
            </div>
            <CardTitle className="text-2xl font-bold">
              Something Went Wrong
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              An unexpected error occurred while loading this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-center pt-2">
            <p className="text-xs text-muted-foreground">
              Please try reloading the page or return later.
            </p>
            <Button variant="default" size="sm" onClick={() => reset()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
