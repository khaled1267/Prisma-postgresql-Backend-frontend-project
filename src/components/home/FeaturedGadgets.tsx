"use client";

import { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Cpu, Search, Sparkles, Filter, RefreshCw } from "lucide-react";

interface FeaturedGadgetsProps {
  products?: Product[];
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategoryId: string | null;
  onResetFilters: () => void;
}

export default function FeaturedGadgets({
  products = [],
  isLoading = false,
  isError = false,
  errorMessage,
  onRetry,
  searchTerm,
  onSearchChange,
  selectedCategoryId,
  onResetFilters,
}: FeaturedGadgetsProps) {
  return (
    <section id="featured-gadgets" className="py-16 bg-base-200/50 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-2">
              <Cpu className="w-4 h-4" />
              <span>Live Tech Inventory</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-base-content">
              Featured <span className="gradient-title">Smart Gadgets</span>
            </h2>
          </div>

          {/* Search Input Bar */}
          <div className="w-full md:w-80">
            <Input
              placeholder="Search by gadget title or specs..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-base-content/50" />}
              inputSize="sm"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <LoadingComponent variant="skeleton" message="Syncing gadget data from Render API..." />
        )}

        {/* Error State */}
        {isError && (
          <ErrorComponent
            title="Unable to load product catalog"
            message={errorMessage || "Make sure the Express backend server is running."}
            onRetry={onRetry}
          />
        )}

        {/* Products Grid */}
        {!isLoading && !isError && (
          <>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-base-100/60 rounded-3xl border border-dashed border-base-300">
                <Cpu className="w-12 h-12 text-base-content/30 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-base-content/80">No Products Available</h3>
                <p className="text-xs text-base-content/50 max-w-md mx-auto mt-1 mb-4">
                  {searchTerm || selectedCategoryId
                    ? "No gadgets match your current search or category filter criteria."
                    : "No products currently found in database catalog."}
                </p>
                {(searchTerm || selectedCategoryId) && (
                  <Button variant="outline" size="sm" onClick={onResetFilters}>
                    Reset Search & Filters
                  </Button>
                )}
              </div>
            )}
          </>
        )}

      </div>
    </section>
  );
}
