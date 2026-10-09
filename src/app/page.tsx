"use client";

import { useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import FeaturedGadgets from "@/components/home/FeaturedGadgets";
import WhyChooseGadgetAI from "@/components/home/WhyChooseGadgetAI";
import AiRecommendationSection from "@/components/home/AiRecommendationSection";
import ReviewsPreviewSection from "@/components/home/ReviewsPreviewSection";
import CtaSection from "@/components/home/CtaSection";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useReviews } from "@/hooks/useReviews";
import { Bot, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // TanStack Query Hooks fetching live backend endpoints:
  // GET /api/products
  const {
    data: products,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
    error: productsError,
    refetch: refetchProducts,
  } = useProducts();

  // GET /api/categories
  const { data: categories } = useCategories();

  // GET /api/reviews
  const {
    data: reviews,
    isLoading: isLoadingReviews,
    isError: isErrorReviews,
    error: reviewsError,
  } = useReviews();

  // Filter products by search term and selected category
  const filteredProducts = (products || []).filter((product) => {
    const matchesCategory = selectedCategoryId ? product.categoryId === selectedCategoryId : true;
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection
        onOpenAiRecommendation={() => setIsAiModalOpen(true)}
        totalProducts={products?.length}
        totalCategories={categories?.length}
      />

      {/* 2. Featured Categories Section */}
      <FeaturedCategories />

      {/* 3. Featured Gadgets Section */}
      <FeaturedGadgets
        products={filteredProducts}
        isLoading={isLoadingProducts}
        isError={isErrorProducts}
        errorMessage={productsError?.message}
        onRetry={() => refetchProducts()}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategoryId={selectedCategoryId}
        onResetFilters={() => {
          setSearchTerm("");
          setSelectedCategoryId(null);
        }}
      />

      {/* 4. Why Choose GadgetAI Section */}
      <WhyChooseGadgetAI />

      {/* 5. AI Recommendation Section */}
      <AiRecommendationSection products={products} />

      {/* 6. Customer Reviews Preview Section */}
      <ReviewsPreviewSection
        reviews={reviews}
        isLoading={isLoadingReviews}
        isError={isErrorReviews}
        errorMessage={reviewsError?.message}
      />

      {/* 7. Call To Action Banner */}
      <CtaSection />

      {/* Interactive AI Recommendation Modal */}
      <Modal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="GadgetAI Copilot"
        description="Get product guidance from the marketplace AI assistant."
        footerActions={
          <>
            <Button variant="ghost" size="sm" onClick={() => setIsAiModalOpen(false)}>
              Not now
            </Button>
            <Link href="/assistant" onClick={() => setIsAiModalOpen(false)}>
              <Button
                variant="primary"
                size="sm"
                rightIcon={<Bot className="h-4 w-4" />}
              >
                Open Copilot
              </Button>
            </Link>
          </>
        }
      >
        <div className="my-2 space-y-3 rounded-2xl border border-primary/20 bg-base-100 p-5">
          <div className="flex items-center gap-2 text-sm font-bold text-primary">
            <Sparkles className="h-4 w-4" />
            Recommendations grounded in your request
          </div>
          <p className="text-sm leading-relaxed text-base-content/70">
            Describe how you plan to use a gadget, what features matter, or
            which products you want to compare. The Copilot can respond with
            recommendations from the connected marketplace catalog.
          </p>
        </div>
      </Modal>
    </div>
  );
}
