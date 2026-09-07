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
  Star,
  Tag,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  MessageSquare,
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
        <div className="bg-base-200 border border-base-300 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            {/* Left: Product Image Showcase */}
            <div className="space-y-4">
              <div className="relative h-80 sm:h-96 w-full bg-base-300 rounded-2xl overflow-hidden border border-base-300 shadow-inner">
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
              <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] text-base-content/70">
                <div className="flex flex-col items-center justify-center p-3 bg-base-100/60 rounded-xl border border-base-300 text-center">
                  <ShieldCheck className="w-5 h-5 text-primary mb-1" />
                  <span className="font-semibold">Official Warranty</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-base-100/60 rounded-xl border border-base-300 text-center">
                  <Truck className="w-5 h-5 text-info mb-1" />
                  <span className="font-semibold">Express Shipping</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-base-100/60 rounded-xl border border-base-300 text-center">
                  <RotateCcw className="w-5 h-5 text-accent mb-1" />
                  <span className="font-semibold">30-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Right: Product Meta & Purchase Actions */}
            <div className="space-y-6">
              
              {/* Stock & Rating Header */}
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

                <div className="flex items-center gap-1 bg-warning/10 text-warning px-3 py-1 rounded-full text-xs font-bold border border-warning/20">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span>4.9 / 5.0</span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
                  {product.title}
                </h1>
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-primary">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-xs text-base-content/50">Includes all local taxes</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 pt-2 border-t border-base-300">
                <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                  Product Description & Specifications
                </h3>
                <p className="text-sm text-base-content/80 leading-relaxed">
                  {product.description ||
                    "High-performance smart hardware curated for seamless AI integration, ultra-low latency workflow automation, and long-term durability."}
                </p>
              </div>

              {/* Category ID info */}
              <div className="bg-base-100/80 p-4 rounded-2xl border border-base-300 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-base-content/60">Category ID:</span>
                  <span className="font-mono text-base-content/80">{product.categoryId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/60">System Product ID:</span>
                  <span className="font-mono text-base-content/80 truncate max-w-[200px]">{product.id}</span>
                </div>
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
        <div className="space-y-8">
          <div className="border-b border-base-300 pb-4 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>Verified Buyer Feedback</span>
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
