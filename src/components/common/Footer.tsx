import Link from "next/link";
import { ArrowUpRight, Bot, Cpu, Layers, ShoppingBag } from "lucide-react";
import { APP_NAME } from "@/utils/constants";

const marketplaceLinks = [
  { label: "Explore gadgets", href: "/gadgets", icon: Cpu },
  { label: "Browse categories", href: "/categories", icon: Layers },
  { label: "Ask the AI Copilot", href: "/assistant", icon: Bot },
];

const accountLinks = [
  { label: "Sign in", href: "/login" },
  { label: "Create an account", href: "/register" },
  { label: "Shopping cart", href: "/cart" },
  { label: "Your orders", href: "/orders" },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-base-300/80 bg-base-200/70 text-base-content">
      <div className="pointer-events-none absolute -right-32 -top-36 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xl font-black tracking-tight"
            >
              <span className="rounded-xl bg-gradient-to-tr from-primary to-secondary p-2 text-base-100 shadow-lg shadow-primary/15">
                <Cpu className="h-5 w-5" />
              </span>
              <span className="bg-gradient-to-r from-primary via-info to-secondary bg-clip-text text-transparent">
                {APP_NAME}
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-base-content/65">
              Explore the live gadget catalog, compare product details, and use
              AI-powered assistance to find technology that fits your needs.
            </p>
            <Link
              href="/assistant"
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary transition-colors hover:border-primary/40 hover:bg-primary/10"
            >
              <Bot className="h-4 w-4" />
              Talk to GadgetAI Copilot
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-base-content/45">
              Marketplace
            </h2>
            <ul className="space-y-3">
              {marketplaceLinks.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-base-content/70 transition-colors hover:text-primary"
                  >
                    <Icon className="h-4 w-4 text-base-content/40 transition-colors group-hover:text-primary" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-base-content/45">
              Your account
            </h2>
            <ul className="space-y-3">
              {accountLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-base-content/70 transition-colors hover:text-primary"
                  >
                    {link.href === "/cart" && (
                      <ShoppingBag className="h-4 w-4 text-base-content/40" />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-base-300/80 pt-5 text-xs text-base-content/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {APP_NAME}. Product information is
            provided by marketplace listings.
          </p>
          <Link
            href="/gadgets"
            className="inline-flex items-center gap-1 font-semibold transition-colors hover:text-primary"
          >
            Browse the catalog
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
