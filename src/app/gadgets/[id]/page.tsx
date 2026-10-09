"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import Button from "@/components/ui/Button";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import ReviewList from "@/components/reviews/ReviewList";
import AddReviewForm from "@/components/reviews/AddReviewForm";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { formatCurrency } from "@/utils/formatters";
import { DEFAULT_PRODUCT_IMAGE } from "@/utils/constants";
import {
  ShoppingBag,
  Tag,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  MessageSquare,
  Boxes,
  ArrowRight,
} from "lucide-react";

interface GadgetDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function GadgetDetailPage({ params }: GadgetDetailPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const { data: product, isLoading, isError, error, refetch } = useProduct(productId);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <PageContainer maxWidth="7xl" className="py-12">
        <LoadingComponent message="Fetching gadget details from backend..." />
      </PageContainer>
    );
  }

  if (isError || !product) {
    return (
      <PageContainer maxWidth="7xl" className="py-12">
        <ErrorComponent
          title="Gadget Not Found"
          message={error?.message || "Could not retrieve the requested gadget from the database."}
          onRetry={() => refetch()}
        />
        <div className="mt-4 text-center">
          <Link href="/gadgets">
            <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Return to Gadgets Catalog
            </Button>
          </Link>
        </div>
      </PageContainer>
    );
  }

  const isOutOfStock = product.stock <= 0 || product.status === "OUT_OF_STOCK";
  const imageUrl = product.image && product.image.trim().length > 0 ? product.image : DEFAULT_PRODUCT_IMAGE;

  return (
    <PageContainer
      maxWidth="7xl"
      backHref="/gadgets"
      backLabel="Back to Explore Gadgets"
    >
      <div className="space-y-12">
        
        {/* Product Showcase Card */}
        <div className="surface-panel rounded-3xl p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            {/* Left: Product Image Showcase */}
            <div className="space-y-4">
              <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-base-300/80 bg-gradient-to-br from-base-300 via-base-200 to-base-300 shadow-inner sm:h-[28rem]">
                <Image
                  src={imageUrl}
                  alt={product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  unoptimized
                  priority
                />
                <div className="absolute top-4 left-4 z-10">
                  {product.category && (
                    <span className="badge badge-primary font-bold text-xs gap-1 shadow-lg p-2.5">
                      <Tag className="w-3.5 h-3.5" />
                      {product.category.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Guarantee Pills */}
              <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[10px] text-base-content/70 sm:text-[11px]">
                <div className="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100/60 p-3">
                  <Boxes className="mb-1 h-5 w-5 text-primary" />
                  <span className="font-semibold">Stock status</span>
                </div>
                <a href="#product-reviews" className="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100/60 p-3 transition-colors hover:border-primary/40 hover:text-primary">
                  <MessageSquare className="mb-1 h-5 w-5 text-info" />
                  <span className="font-semibold">Buyer reviews</span>
                </a>
                <div className="flex flex-col items-center justify-center rounded-2xl border border-base-300 bg-base-100/60 p-3">
                  <ShoppingBag className="mb-1 h-5 w-5 text-secondary" />
                  <span className="font-semibold">Add to cart</span>
                </div>
              </div>
            </div>

            {/* Right: Product Meta & Purchase Actions */}
            <div className="space-y-6">
              
              {/* Stock & Category Header */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  {isOutOfStock ? (
                    <span className="badge badge-error gap-1.5 font-bold text-xs shadow-md text-white p-2.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Out of Stock
                    </span>
                  ) : (
                    <span className="badge badge-success gap-1.5 font-bold text-xs shadow-md text-base-100 p-2.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      In Stock ({product.stock} units)
                    </span>
                  )}
                </div>
                {product.category && (
                  <Link
                    href={`/gadgets?category=${product.categoryId}`}
                    className="badge badge-ghost gap-1.5 border border-base-300 px-3 py-3 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Tag className="h-3.5 w-3.5" />
                    {product.category.name}
                  </Link>
                )}
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
                  {product.title}
                </h1>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-black tabular-nums text-primary sm:text-4xl">
                    {formatCurrency(product.price)}
                  </span>
                </div>
                <a
                  href="#product-reviews"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-base-content/60 transition-colors hover:text-primary"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  Ratings &amp; customer feedback
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Description */}
              <div className="space-y-2 pt-2 border-t border-base-300">
                <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                  Product Description & Specifications
                </h3>
                <p className="text-sm text-base-content/80 leading-relaxed">
                  {product.description ||
                    "The seller has not added a description for this item yet."}
                </p>
              </div>

              {/* Add to Cart Actions */}
              <div className="pt-4 border-t border-base-300 flex flex-col sm:flex-row gap-3">
                <Button
                  variant={added ? "success" : "primary"}
                  size="lg"
                  isFullWidth
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  leftIcon={<ShoppingBag className="w-5 h-5" />}
                >
                  {isOutOfStock
                    ? "Out of Stock"
                    : added
                    ? "Item Added to Cart!"
                    : "Add to Shopping Cart"}
                </Button>
              </div>

            </div>

          </div>
        </div>

        {/* Customer Reviews & Feedback Section */}
        <div id="product-reviews" className="scroll-mt-24 space-y-8">
          <div className="border-b border-base-300 pb-4 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>Customer Feedback</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight">
                Customer <span className="gradient-title">Reviews & Ratings</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left 2 Cols: Review List & Breakdown */}
            <div className="lg:col-span-2">
              <ReviewList productId={product.id} />
            </div>

            {/* Right Col: Add Review Form */}
            <div>
              <AddReviewForm productId={product.id} />
            </div>
          </div>
        </div>

      </div>
    </PageContainer>
  );
}
