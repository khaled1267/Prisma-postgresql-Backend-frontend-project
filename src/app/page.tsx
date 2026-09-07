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
  const {
    data: categories,
    isLoading: isLoadingCategories,
  } = useCategories();

  // GET /api/reviews
  const {
    data: reviews,
    isLoading: isLoadingReviews,
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
      <ReviewsPreviewSection reviews={reviews} isLoading={isLoadingReviews} />

      {/* 7. Call To Action Banner */}
      <CtaSection />

      {/* Interactive AI Recommendation Modal */}
      <Modal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="🤖 AI Gadget Matchmaker Assistant"
        description="Our AI model analyzes your hardware preferences and suggests the ideal smart gadget."
        footerActions={
          <Button variant="primary" size="sm" onClick={() => setIsAiModalOpen(false)}>
            Close Assistant
          </Button>
        }
      >
        <div className="p-4 bg-base-100 rounded-2xl border border-primary/20 space-y-3 my-2">
          <div className="flex items-center gap-2 text-primary font-bold text-xs">
            <Sparkles className="w-4 h-4" /> AI Analysis Complete
          </div>
          <p className="text-xs text-base-content/80">
            Based on current Render API catalog trends, our top recommended gadget for software engineering & automation is the <strong>Neural Core X1 Wearable</strong>.
          </p>
        </div>
      </Modal>
    </div>
  );
}
