"use client";

import { Review } from "@/types/review";
import { Star, MessageSquareQuote, UserCheck, Sparkles } from "lucide-react";
import { formatDate } from "@/utils/formatters";
import LoadingComponent from "@/components/common/LoadingComponent";

interface ReviewsPreviewSectionProps {
  reviews?: Review[];
  isLoading?: boolean;
}

export default function ReviewsPreviewSection({
  reviews = [],
  isLoading = false,
}: ReviewsPreviewSectionProps) {
  // Show top 3 latest reviews
  const previewReviews = reviews.slice(0, 3);

  return (
    <section className="py-20 bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-2">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Verified Customer Feedback</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-base-content">
              Community <span className="gradient-title">Reviews & Ratings</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-base-200 px-4 py-2 rounded-2xl border border-base-300">
            <div className="flex items-center text-warning">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-warning" />
              ))}
            </div>
            <span className="font-bold text-sm text-base-content">4.9 / 5.0</span>
            <span className="text-xs text-base-content/50">({reviews.length} total)</span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <LoadingComponent variant="skeleton" message="Loading verified customer reviews..." />}

        {/* Reviews Cards Grid */}
        {!isLoading && previewReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewReviews.map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl bg-base-200 border border-base-300 hover:border-primary/40 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-warning mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "fill-warning" : "text-base-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-base-content/80 line-clamp-3 leading-relaxed mb-4 italic">
                    "{review.comment || "High-quality smart gadget. Exceeded expectations in daily performance and software integration."}"
                  </p>
                </div>

                {/* Reviewer & Product Info */}
                <div className="pt-4 border-t border-base-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                      {review.user?.name ? review.user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-base-content line-clamp-1">
                        {review.user?.name || "Verified Customer"}
                      </div>
                      <div className="text-[10px] text-base-content/50">
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                  </div>

                  {review.product && (
                    <span className="badge badge-ghost badge-sm text-[10px] truncate max-w-[100px]">
                      {review.product.title}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && previewReviews.length === 0 && (
          <div className="p-8 text-center bg-base-200/50 rounded-2xl border border-dashed border-base-300">
            <MessageSquareQuote className="w-10 h-10 text-base-content/30 mx-auto mb-2" />
            <p className="text-xs text-base-content/60">No customer reviews published yet.</p>
          </div>
        )}

      </div>
    </section>
  );
}
