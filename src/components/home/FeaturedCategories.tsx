"use client";

import Link from "next/link";
import { Layers, ArrowRight } from "lucide-react";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import CategoryCard from "@/components/categories/CategoryCard";
import { useCategories } from "@/hooks/useCategories";
import Button from "@/components/ui/Button";

export default function FeaturedCategories() {
  const { data: categories, isLoading, isError, error, refetch } = useCategories();

  return (
    <section className="py-16 bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-2">
              <Layers className="w-4 h-4" />
              <span>Smart Hardware Divisions</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-base-content">
              Featured <span className="gradient-title">Gadget Categories</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-xs text-base-content/60 max-w-xs hidden md:block">
              Browse our catalog sorted into specialized divisions for AI devices, wearables, and automation.
            </p>
            <Link href="/categories">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Categories
              </Button>
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <LoadingComponent variant="skeleton" message="Loading categories..." />}

        {/* Error State */}
        {isError && (
          <ErrorComponent
            title="Failed to load categories"
            message={error?.message || "Error retrieving categories from backend."}
            onRetry={() => refetch()}
          />
        )}

        {/* Categories Cards Grid */}
        {!isLoading && !isError && categories && categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && categories && categories.length === 0 && (
          <div className="p-8 text-center bg-base-200/50 rounded-2xl border border-dashed border-base-300">
            <Layers className="w-10 h-10 text-base-content/30 mx-auto mb-2" />
            <p className="text-xs text-base-content/60">No hardware categories found in database.</p>
          </div>
        )}

      </div>
    </section>
  );
}
