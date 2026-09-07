"use client";

import Link from "next/link";
import { Cpu, Sparkles, ArrowRight, Bot, ShieldCheck, Zap, Layers } from "lucide-react";
import Button from "@/components/ui/Button";

interface HeroSectionProps {
  onOpenAiRecommendation: () => void;
  totalProducts?: number;
  totalCategories?: number;
}

export default function HeroSection({
  onOpenAiRecommendation,
  totalProducts = 0,
  totalCategories = 0,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-base-200/90 via-base-100 to-base-100 py-16 lg:py-24 border-b border-base-300">
      {/* Subtle Background Glow Elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Next-Gen Smart Electronics Marketplace</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              The Future of Tech, <br />
              <span className="gradient-title">Powered by AI Curation</span>
            </h1>

            <p className="text-sm sm:text-base text-base-content/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore high-performance smart wearables, autonomous drones, home automation systems, and developer hardware—curated by intelligent algorithm models.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a href="#featured-gadgets">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Gadgets
                </Button>
              </a>

              <Button
                variant="outline"
                size="lg"
                onClick={onOpenAiRecommendation}
                leftIcon={<Bot className="w-5 h-5 text-secondary" />}
              >
                Get AI Recommendation
              </Button>
            </div>

            {/* Live Metrics Pills */}
            <div className="pt-6 border-t border-base-300/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className="text-2xl font-black text-primary">
                  {totalProducts > 0 ? `${totalProducts}+` : "100+"}
                </div>
                <div className="text-xs text-base-content/60 font-medium">Smart Gadgets</div>
              </div>

              <div>
                <div className="text-2xl font-black text-secondary">
                  {totalCategories > 0 ? totalCategories : "8+"}
                </div>
                <div className="text-xs text-base-content/60 font-medium">Categories</div>
              </div>

              <div>
                <div className="text-2xl font-black text-success">99.9%</div>
                <div className="text-xs text-base-content/60 font-medium">API Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Gadget-Themed Visual Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-gradient-to-tr from-base-200 to-base-300 border border-base-300/80 rounded-3xl p-6 shadow-2xl overflow-hidden group">
              {/* Top Card Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-error" />
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <div className="w-3 h-3 rounded-full bg-success" />
                </div>
                <span className="badge badge-primary badge-sm font-bold gap-1 text-[10px]">
                  <ShieldCheck className="w-3 h-3" /> Live Render API
                </span>
              </div>

              {/* Central Holographic Gadget Preview */}
              <div className="relative h-64 bg-base-100/80 rounded-2xl border border-primary/20 p-6 flex flex-col items-center justify-center text-center shadow-inner group-hover:border-primary/50 transition duration-500">
                <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-4 shadow-lg shadow-primary/20 animate-pulse">
                  <Cpu className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-extrabold text-base-content">
                  Neural Core X1 Wearable
                </h3>
                <p className="text-xs text-base-content/60 mt-1">
                  Autonomous AI Assistant with Real-time Biomarker Tracking
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xl font-black text-primary">$349.99</span>
                  <span className="badge badge-success badge-sm font-bold text-base-100">
                    In Stock
                  </span>
                </div>
              </div>

              {/* Floating Stat Badges */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="p-3 bg-base-100/60 rounded-xl border border-base-300 text-xs flex items-center gap-2">
                  <Zap className="w-4 h-4 text-warning shrink-0" />
                  <div>
                    <div className="font-bold">Next-Day Ship</div>
                    <div className="text-[10px] text-base-content/50">Verified Order</div>
                  </div>
                </div>

                <div className="p-3 bg-base-100/60 rounded-xl border border-base-300 text-xs flex items-center gap-2">
                  <Layers className="w-4 h-4 text-info shrink-0" />
                  <div>
                    <div className="font-bold">Prisma ORM</div>
                    <div className="text-[10px] text-base-content/50">PostgreSQL Sync</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
