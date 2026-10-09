"use client";

import dynamic from "next/dynamic";
import { ArrowRight, Bot, Boxes, Search, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import GadgetSceneFallback from "@/components/home/GadgetSceneFallback";

const GadgetScene = dynamic(() => import("@/components/home/GadgetScene"), {
  ssr: false,
  loading: () => <GadgetSceneFallback />,
});

interface HeroSectionProps {
  onOpenAiRecommendation: () => void;
  totalProducts?: number;
  totalCategories?: number;
}

export default function HeroSection({
  onOpenAiRecommendation,
  totalProducts,
  totalCategories,
}: HeroSectionProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-base-300 bg-gradient-to-b from-base-200/90 via-base-100 to-base-100 py-14 sm:py-16 lg:py-20">
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="space-y-6 text-center lg:col-span-7 lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-bold text-primary shadow-sm">
            <Sparkles className="h-4 w-4 motion-safe:animate-pulse" />
            <span>Next-Gen Smart Electronics Marketplace</span>
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
            The Future of Tech, <br />
            <span className="gradient-title">Powered by AI Curation</span>
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-base-content/70 sm:text-base lg:mx-0">
            Explore real marketplace listings, check current availability, and
            ask the GadgetAI Copilot to help compare the technology that fits
            your needs.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row lg:justify-start">
            <a href="#featured-gadgets">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Explore Gadgets
              </Button>
            </a>

            <Button
              variant="outline"
              size="lg"
              onClick={onOpenAiRecommendation}
              leftIcon={<Bot className="h-5 w-5 text-secondary" />}
            >
              Get AI Recommendation
            </Button>
          </div>

          <div className="mx-auto grid max-w-lg grid-cols-3 gap-4 border-t border-base-300/80 pt-6 lg:mx-0">
            <div>
              <div className="text-2xl font-black text-primary">
                {totalProducts ?? "—"}
              </div>
              <div className="text-xs font-medium text-base-content/60">Products</div>
            </div>

            <div>
              <div className="text-2xl font-black text-secondary">
                {totalCategories ?? "—"}
              </div>
              <div className="text-xs font-medium text-base-content/60">
                Categories
              </div>
            </div>

            <div>
              <div className="text-2xl font-black text-success">AI</div>
              <div className="text-xs font-medium text-base-content/60">
                Product discovery
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:col-span-5">
          <div className="pointer-events-none absolute inset-x-[12%] top-[12%] aspect-square rounded-full border border-primary/10" />
          <div className="pointer-events-none absolute inset-x-[20%] top-[20%] aspect-square rounded-full border border-secondary/15" />
          <div className="relative h-[340px] w-full sm:h-[440px] lg:h-[500px]">
            <GadgetScene />
          </div>

          <div className="pointer-events-none absolute left-2 top-2 flex items-center gap-2 rounded-full border border-base-300/80 bg-base-100/80 px-3 py-2 text-[9px] font-bold text-base-content/75 shadow-lg backdrop-blur sm:left-0 sm:top-8 sm:text-[10px]">
            <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            <span className="sm:hidden">DRAG TO EXPLORE</span>
            <span className="hidden sm:inline">INTERACTIVE 3D PREVIEW</span>
          </div>

          <div className="pointer-events-none absolute bottom-3 left-1 right-1 flex items-end justify-between gap-3 sm:bottom-6 sm:left-2 sm:right-2">
            <div className="rounded-2xl border border-base-300/80 bg-base-100/85 p-3 shadow-xl backdrop-blur-md sm:p-4">
              <div className="mb-1 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-3 w-3" />
                AI product discovery
              </div>
              <div className="text-xs font-extrabold text-base-content sm:text-sm">
                Find your next gadget
              </div>
              <div className="mt-1 text-[10px] text-base-content/55">
                Search · compare · discover
              </div>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-base-300/80 bg-base-100/85 px-3 py-2 text-[10px] shadow-lg backdrop-blur-md">
                <Boxes className="h-4 w-4 shrink-0 text-success" />
                <span className="font-semibold">Live catalog</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-base-300/80 bg-base-100/85 px-3 py-2 text-[10px] shadow-lg backdrop-blur-md">
                <Search className="h-4 w-4 shrink-0 text-warning" />
                <span className="font-semibold">Find your fit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
