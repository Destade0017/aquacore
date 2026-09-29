import * as React from "react";
import Link from "next/link";
import { Waves } from "lucide-react";
import { Container } from "@/components/layout/container";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-border bg-muted/40 text-foreground">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Info Section */}
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm w-fit"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
                <Waves className="h-4 w-4" />
              </div>
              <span>AquaCore</span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Professional swimming and aquatic training organisation. Dedicated to water safety, skill mastery, and aquatic education.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </h4>
            <ul className="flex flex-col space-y-2 text-sm text-foreground/80">
              <li>
                <Link href="/" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                  Training Locations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs & Training Section */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Training & Programs
            </h4>
            <ul className="flex flex-col space-y-2 text-sm text-foreground/80">
              <li>
                <Link href="/programs" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                  Swimming Programs
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                  Educational Courses
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                  Certificate Verification
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support Section (Placeholders) */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Organisation & Support
            </h4>
            <p className="text-xs text-muted-foreground">
              Operating hours, support details, and physical location specifications configurable per deployment environment.
            </p>
          </div>
        </div>

        {/* Footer Legal & Copyright Line */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AquaCore Platform. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/faq" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
              FAQ
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
