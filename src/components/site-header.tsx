"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Cross } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Messages", href: "/messages" },
  { name: "Prayers", href: "/prayers" },
  { name: "Novenas", href: "/novenas" },
  { name: "Events", href: "/events" },
  { name: "Videos", href: "/videos" },
  { name: "Prayer Requests", href: "/prayer-requests" },
];

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Cross className="h-6 w-6 text-primary" />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold leading-tight text-primary">
              Nyina wa Jambo
            </span>
            <span className="hidden text-xs leading-tight text-muted-foreground sm:block">
              Friends of the Mother of the Word
            </span>
          </div>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          <Link href="/newsletter">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Subscribe
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="p-2 text-foreground/70 hover:text-foreground lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="flex flex-col gap-3 px-6 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="py-2 text-base font-medium text-foreground/80 transition-colors hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/newsletter"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Subscribe to Newsletter
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
