"use client";

import { useState } from "react";
import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";
import { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";
import { Bot, Sparkles, ArrowRight, SlidersHorizontal } from "lucide-react";

interface AiRecommendationSectionProps {
  products?: Product[];
}

export default function AiRecommendationSection({ products = [] }: AiRecommendationSectionProps) {
  const { data: categories } = useCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [maxBudget, setMaxBudget] = useState<number>(500);

  const recommendedProducts = products
    .filter((product) => {
      const price =
        typeof product.price === "number"
          ? product.price
          : Number.parseFloat(product.price);

      return (
        Number.isFinite(price) &&
        price <= maxBudget &&
        (selectedCategoryId === "all" ||
          product.categoryId === selectedCategoryId)
      );
    })
    .sort((first, second) => {
      const firstPrice =
        typeof first.price === "number"
          ? first.price
          : Number.parseFloat(first.price);
      const secondPrice =
        typeof second.price === "number"
          ? second.price
          : Number.parseFloat(second.price);
      return firstPrice - secondPrice;
    })
    .slice(0, 3);

  return (
    <section id="ai-recommendations" className="py-20 bg-gradient-to-b from-base-100 via-base-200/40 to-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-base-200/90 border border-primary/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Background Glow Accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
            
            {/* Header Description */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
                <Bot className="w-4 h-4" />
                <span>Smart catalog picks</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
                Find the right tech <span className="gradient-title">for your budget</span>
              </h2>

              <p className="text-xs sm:text-sm text-base-content/70 max-w-xl">
                Narrow the live catalog by price and category. For conversational
                recommendations, ask the GadgetAI Copilot.
              </p>
              <Link
                href="/assistant"
                className="inline-flex items-center gap-1 text-xs font-bold text-primary transition-colors hover:text-info"
              >
                Chat with GadgetAI Copilot
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Interactive Form Controls */}
            <div className="lg:col-span-5 bg-base-100/90 border border-base-300 rounded-2xl p-5 space-y-4 shadow-md">
              <div>
                <label
                  htmlFor="recommendation-category"
                  className="mb-2 block text-xs font-bold text-base-content/80"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
                    Category
                  </span>
                </label>
                <select
                  id="recommendation-category"
                  className="select select-bordered select-sm w-full rounded-xl bg-base-200"
                  value={selectedCategoryId}
                  onChange={(event) => setSelectedCategoryId(event.target.value)}
                >
                  <option value="all">All categories</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="recommendation-budget"
                  className="mb-1 flex justify-between text-xs font-bold text-base-content/80"
                >
                  <span>Maximum budget</span>
                  <span className="text-primary font-mono">${maxBudget}</span>
                </label>
                <input
                  id="recommendation-budget"
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(Number(e.target.value))}
                  aria-valuetext={`Up to $${maxBudget}`}
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
                {recommendedProducts.length} matching{" "}
                {recommendedProducts.length === 1 ? "gadget" : "gadgets"}
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
                  No catalog items match these filters under ${maxBudget}. Try
                  another category or increase your budget.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
