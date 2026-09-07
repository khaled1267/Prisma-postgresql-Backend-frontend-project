"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import { Bot, Sparkles, CheckCircle2, ArrowRight, Zap } from "lucide-react";

interface AiRecommendationSectionProps {
  products?: Product[];
}

export default function AiRecommendationSection({ products = [] }: AiRecommendationSectionProps) {
  const [selectedIntent, setSelectedIntent] = useState<string>("ALL");
  const [maxBudget, setMaxBudget] = useState<number>(500);

  const intents = [
    { id: "ALL", label: "Any Category Intent" },
    { id: "SMART_HOME", label: "Smart Home Automation" },
    { id: "WEARABLES", label: "Health & Wearables" },
    { id: "DEV_HARDWARE", label: "Developer & AI Tools" },
  ];

  // Filter recommendations based on client budget and intent matching
  const recommendedProducts = products.filter((item) => {
    const price = typeof item.price === "string" ? parseFloat(item.price) : item.price;
    const matchesBudget = isNaN(price) || price <= maxBudget;
    return matchesBudget;
  }).slice(0, 3); // Take top 3 matches

  return (
    <section id="ai-recommendations" className="py-20 bg-gradient-to-b from-base-100 via-base-200/40 to-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-base-200/90 border border-primary/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Background Glow Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            
            {/* Header Description */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold">
                <Bot className="w-4 h-4" />
                <span>AI Recommendation Engine</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
                Get Personalized <span className="gradient-title">Gadget Recommendations</span>
              </h2>

              <p className="text-xs sm:text-sm text-base-content/70 max-w-xl">
                Configure your budget and technical requirements below to instantly generate matching hardware recommendations.
              </p>
            </div>

            {/* Interactive Form Controls */}
            <div className="lg:col-span-5 bg-base-100/90 border border-base-300 rounded-2xl p-5 space-y-4 shadow-md">
              <div>
                <label className="text-xs font-bold text-base-content/80 block mb-2">
                  Select Primary Tech Focus
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {intents.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedIntent(item.id)}
                      className={`btn btn-xs rounded-xl font-semibold text-[11px] justify-start gap-1 transition ${
                        selectedIntent === item.id ? "btn-primary" : "btn-ghost bg-base-200"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-base-content/80 mb-1">
                  <span>Max Budget Filter</span>
                  <span className="text-primary font-mono">${maxBudget}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  className="range range-xs range-primary w-full"
                />
              </div>
            </div>

          </div>

          {/* Recommended Product Results Preview */}
          <div className="pt-6 border-t border-base-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-base-content/80 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                AI Curated Matches ({recommendedProducts.length})
              </h3>
            </div>

            {recommendedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-base-100/60 rounded-2xl border border-dashed border-base-300">
                <p className="text-xs text-base-content/60">
                  No products matched budget under ${maxBudget}. Adjust budget slider above to expand options.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
