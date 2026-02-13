import Link from "next/link";
import { Cross } from "lucide-react";

const footerLinks = [
  {
    title: "Discover",
    links: [
      { name: "Messages of Kibeho", href: "/messages" },
      { name: "Daily Reflection", href: "/messages#daily" },
      { name: "About the Apparitions", href: "/messages#about" },
    ],
  },
  {
    title: "Prayer Life",
    links: [
      { name: "Prayers", href: "/prayers" },
      { name: "Novenas", href: "/novenas" },
      { name: "Prayer Requests", href: "/prayer-requests" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Events", href: "/events" },
      { name: "Videos & Testimonies", href: "/videos" },
      { name: "Newsletter", href: "/newsletter" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Cross className="h-6 w-6" />
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold">
                  Nyina wa Jambo
                </span>
                <span className="text-xs text-primary-foreground/50">
                  Friends of the Mother of the Word
                </span>
              </div>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
              A movement dedicated to spreading the messages of hope,
              repentance, and peace given by the Blessed Virgin Mary at Kibeho,
              Rwanda.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/20 pt-8 md:flex-row">
          <p className="text-sm text-primary-foreground/60">
            Friends of Nyina wa Jambo. All rights reserved. Pray for us.
          </p>
          <p className="text-sm italic text-primary-foreground/60">
            &ldquo;My children, pray, pray, pray.&rdquo; - Our Lady of Kibeho
          </p>
        </div>
      </div>
    </footer>
  );
}
