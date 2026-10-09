"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageContainer from "@/components/ui/PageContainer";
import ProductCard from "@/components/products/ProductCard";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Search, Filter, SlidersHorizontal, RefreshCw, XCircle } from "lucide-react";

function GadgetsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const { data: products, isLoading, isError, error, refetch } = useProducts();
  const { data: categories } = useCategories();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Keep category param in sync if query param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products
      .filter((product) => {
        // Search Filter
        const matchesSearch =
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

        // Category Filter
        const matchesCategory =
          selectedCategory === "all" || product.categoryId === selectedCategory;

        // Status Filter
        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "in_stock" && product.stock > 0 && product.status !== "OUT_OF_STOCK") ||
          (statusFilter === "out_of_stock" && (product.stock <= 0 || product.status === "OUT_OF_STOCK"));

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        const priceA = typeof a.price === "number" ? a.price : parseFloat(a.price) || 0;
        const priceB = typeof b.price === "number" ? b.price : parseFloat(b.price) || 0;

        if (sortBy === "price_asc") return priceA - priceB;
        if (sortBy === "price_desc") return priceB - priceA;
        if (sortBy === "name") return a.title.localeCompare(b.title);
        // Default: newest
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
  }, [products, searchQuery, selectedCategory, statusFilter, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setStatusFilter("all");
    setSortBy("newest");
  };

  return (
    <>
      {/* Search & Filtering Controls Header */}
      <div className="bg-base-200 border border-base-300 rounded-3xl p-5 mb-8 shadow-lg space-y-4">
        
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <Input
              placeholder="Search gadgets by title or specs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-primary" />}
              rightIcon={
                searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="focus:outline-none hover:text-error"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                ) : undefined
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => refetch()}
              leftIcon={<RefreshCw className="w-4 h-4" />}
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* Filters & Sorting Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-base-300 text-xs">
          
          {/* Category Dropdown */}
          <div>
            <label className="label py-1">
              <span className="label-text font-semibold text-xs flex items-center gap-1">
                <Filter className="w-3 h-3 text-primary" /> Category
              </span>
            </label>
            <select
              className="select select-bordered select-sm w-full bg-base-100 rounded-xl"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock / Status Dropdown */}
          <div>
            <label className="label py-1">
              <span className="label-text font-semibold text-xs flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3 text-primary" /> Stock Availability
              </span>
            </label>
            <select
              className="select select-bordered select-sm w-full bg-base-100 rounded-xl"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Stock Statuses</option>
              <option value="in_stock">In Stock Only</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          {/* Sorting Dropdown */}
          <div>
            <label className="label py-1">
              <span className="label-text font-semibold text-xs">Sort By</span>
            </label>
            <select
              className="select select-bordered select-sm w-full bg-base-100 rounded-xl"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Product Name (A-Z)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Result Count Status */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-base-content/80">
          Showing <span className="text-primary">{filteredProducts.length}</span> Gadgets
        </h2>

        {(searchQuery || selectedCategory !== "all" || statusFilter !== "all" || sortBy !== "newest") && (
          <button
            onClick={clearFilters}
            className="text-xs text-error hover:underline font-semibold flex items-center gap-1"
          >
            <XCircle className="w-3.5 h-3.5" /> Clear All Filters
          </button>
        )}
      </div>

      {/* Loading Skeleton Grid */}
      {isLoading && (
        <LoadingComponent
          variant="skeleton"
          message="Fetching gadgets from backend marketplace..."
        />
      )}

      {/* Error State with Retry */}
      {isError && (
        <ErrorComponent
          title="Failed to Load Marketplace Products"
          message={error?.message || "There was an error communicating with the Render backend server."}
          onRetry={() => refetch()}
        />
      )}

      {/* Empty Filter Result State */}
      {!isLoading && !isError && filteredProducts.length === 0 && (
        <div className="bg-base-200 border border-base-300 rounded-3xl p-12 text-center max-w-lg mx-auto">
          <XCircle className="w-16 h-16 text-error/50 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-base-content mb-1">No Gadgets Found</h3>
          <p className="text-xs text-base-content/60 mb-6">
            No gadgets match your current search query or filter options.
          </p>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Reset Filters
          </Button>
        </div>
      )}

      {/* Product Responsive Grid */}
      {!isLoading && !isError && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default function ExploreGadgetsPage() {
  return (
    <PageContainer
      maxWidth="7xl"
      title="Explore Smart Gadgets Marketplace"
      description="Discover cutting-edge AI devices, smart wearables, and next-gen hardware."
    >
      <Suspense fallback={<LoadingComponent message="Loading gadget marketplace..." />}>
        <GadgetsContent />
      </Suspense>
    </PageContainer>
  );
}
