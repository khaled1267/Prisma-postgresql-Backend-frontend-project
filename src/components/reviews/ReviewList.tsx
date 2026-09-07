"use client";

import { useMemo } from "react";
import ReviewCard from "@/components/reviews/ReviewCard";
import RatingStars from "@/components/reviews/RatingStars";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import { useReviews } from "@/hooks/useReviews";
import { Star, MessageSquare } from "lucide-react";

interface ReviewListProps {
  productId?: string;
}

export default function ReviewList({ productId }: ReviewListProps) {
  const { data: allReviews, isLoading, isError, error, refetch } = useReviews();

  const reviews = useMemo(() => {
    if (!allReviews) return [];
    if (!productId) return allReviews;
    return allReviews.filter((r) => r.productId === productId);
  }, [allReviews, productId]);

  // Compute average score & distribution
  const { avgRating, totalReviews, ratingCounts } = useMemo(() => {
    if (reviews.length === 0) {
      return { avgRating: 0, totalReviews: 0, ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = Number((sum / reviews.length).toFixed(1));

    const counts: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      if (counts[r.rating] !== undefined) {
        counts[r.rating]++;
      }
    });

    return { avgRating: avg, totalReviews: reviews.length, ratingCounts: counts };
  }, [reviews]);

  if (isLoading) {
    return <LoadingComponent message="Loading customer reviews..." />;
  }

  if (isError) {
    return (
      <ErrorComponent
        title="Failed to Load Reviews"
        message={error?.message || "Error fetching review entries from backend."}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Review Summary Breakdown Header */}
      {totalReviews > 0 && (
        <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row gap-6 items-center">
          
          {/* Average Rating Score Pill */}
          <div className="flex flex-col items-center justify-center p-4 bg-base-100/80 rounded-2xl border border-base-300 min-w-[140px] text-center">
            <span className="text-4xl font-black text-primary">{avgRating}</span>
            <RatingStars rating={Math.round(avgRating)} size="sm" />
            <span className="text-[11px] text-base-content/50 mt-1 font-semibold">
              Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </span>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="flex-1 w-full space-y-1.5 text-xs">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingCounts[stars] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={stars} className="flex items-center gap-3">
                  <span className="w-12 text-right font-bold text-base-content/70">
                    {stars} Star
                  </span>
                  <div className="flex-1 bg-base-300 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-warning h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono text-[11px] text-base-content/50">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Empty State */}
      {totalReviews === 0 && (
        <div className="bg-base-200/50 border border-dashed border-base-300 rounded-3xl p-8 text-center space-y-2">
          <MessageSquare className="w-10 h-10 text-base-content/30 mx-auto mb-1" />
          <h4 className="font-bold text-sm text-base-content">No Reviews Yet</h4>
          <p className="text-xs text-base-content/60">
            Be the first customer to leave a review for this smart gadget!
          </p>
        </div>
      )}

      {/* Review Cards Grid / List */}
      {totalReviews > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}

    </div>
  );
}
