import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
  title: {
    default: "AquaCore — Swimming & Aquatic Training",
    template: "%s | AquaCore",
  },
  description: "Professional digital platform for swimming lessons, lifeguard training, and aquatic safety education.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <SiteHeader />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
