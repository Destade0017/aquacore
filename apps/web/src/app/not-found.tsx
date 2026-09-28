import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/container";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex-1 py-16 md:py-24 flex items-center justify-center">
      <Container>
        <Card className="max-w-md mx-auto w-full text-center">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-2">
              <Badge variant="destructive">404 — Not Found</Badge>
            </div>
            <CardTitle className="text-2xl font-bold">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              The page or resource you requested could not be found.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-center pt-2">
            <p className="text-xs text-muted-foreground">
              Please check the URL or return to the main navigation.
            </p>
            <Link href="/">
              <Button variant="default" size="sm">
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Container>
    </main>
  );
}
