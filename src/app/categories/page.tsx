"use client";

import { useState, useMemo } from "react";
import PageContainer from "@/components/ui/PageContainer";
import CategoryCard from "@/components/categories/CategoryCard";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useCategories } from "@/hooks/useCategories";
import { Layers, Search, RefreshCw, XCircle } from "lucide-react";

export default function CategoriesPage() {
  const { data: categories, isLoading, isError, error, refetch } = useCategories();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    return categories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [categories, searchQuery]);

  return (
    <PageContainer
      maxWidth="7xl"
      title={
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-primary/10 border border-primary/30 text-primary">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-base-content">Hardware Categories</h1>
            <p className="text-xs text-base-content/60">Browse specialized gadget divisions and AI hardware classifications</p>
          </div>
        </div>
      }
    >
      {/* Search Header Controls */}
      <div className="bg-base-200 border border-base-300 rounded-3xl p-5 mb-8 shadow-lg flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search categories by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-primary" />}
            rightIcon={
              searchQuery ? (
                <button onClick={() => setSearchQuery("")} className="hover:text-error">
                  <XCircle className="w-4 h-4" />
                </button>
              ) : undefined
            }
          />
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => refetch()}
          leftIcon={<RefreshCw className="w-4 h-4" />}
        >
          Refresh Categories
        </Button>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <LoadingComponent variant="skeleton" message="Fetching hardware divisions..." />
      )}

      {/* Error Alert */}
      {isError && (
        <ErrorComponent
          title="Failed to Load Categories"
          message={error?.message || "There was an error communicating with the backend."}
          onRetry={() => refetch()}
        />
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredCategories.length === 0 && (
        <div className="bg-base-200 border border-base-300 rounded-3xl p-12 text-center max-w-md mx-auto">
          <Layers className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-base-content mb-1">No Categories Found</h3>
          <p className="text-xs text-base-content/60 mb-6">
            No hardware category matches your current search term "{searchQuery}".
          </p>
          <Button variant="outline" size="sm" onClick={() => setSearchQuery("")}>
            Reset Search
          </Button>
        </div>
      )}

      {/* Category Grid */}
      {!isLoading && !isError && filteredCategories.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
