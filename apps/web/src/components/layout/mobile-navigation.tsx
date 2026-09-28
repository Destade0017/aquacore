"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface NavLink {
  label: string;
  href: string;
}

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

export function MobileNavigation({
  isOpen,
  onClose,
  links,
}: MobileNavigationProps) {
  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="md:hidden border-b border-border bg-background px-4 pt-2 pb-6 flex flex-col gap-4"
    >
      <nav aria-label="Mobile navigation" className="flex flex-col space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-sm font-medium text-foreground/80 hover:text-primary py-2 px-3 rounded-md transition-colors hover:bg-secondary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="pt-2 border-t border-border flex flex-col">
        <Link href="/book" onClick={onClose}>
          <Button variant="default" size="sm" className="w-full">
            Book a Lesson
          </Button>
        </Link>
      </div>
    </div>
  );
}
