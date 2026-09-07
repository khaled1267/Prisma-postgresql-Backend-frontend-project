import Link from "next/link";
import { Cpu, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-tr from-base-200 via-base-100 to-base-200 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/10 border border-primary/30 p-8 sm:p-14 text-center overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Join 10,000+ Smart Tech Enthusiasts</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-base-content leading-tight">
              Ready to Upgrade Your <br />
              <span className="gradient-title">Smart Electronics Setup?</span>
            </h2>

            <p className="text-xs sm:text-sm text-base-content/70 max-w-xl mx-auto leading-relaxed">
              Create a free account to unlock personalized AI gadget recommendations, saved wishlists, priority global shipping, and exclusive marketplace deals.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link href="/register">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Create Free Account
                </Button>
              </Link>
              
              <a href="#featured-gadgets">
                <Button variant="outline" size="lg">
                  Browse Catalog
                </Button>
              </a>
            </div>

            <div className="pt-4 flex items-center justify-center gap-4 text-[11px] text-base-content/60 font-semibold">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-success" /> Instant JWT Auth
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-primary" /> Render Express Backend
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
