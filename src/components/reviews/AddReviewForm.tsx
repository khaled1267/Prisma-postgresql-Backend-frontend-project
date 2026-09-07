"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import RatingStars from "@/components/reviews/RatingStars";
import Button from "@/components/ui/Button";
import { useCreateReviewMutation } from "@/hooks/useReviewMutations";
import { Star, MessageSquare, AlertCircle, CheckCircle2, LogIn } from "lucide-react";

interface AddReviewFormProps {
  productId: string;
}

export default function AddReviewForm({ productId }: AddReviewFormProps) {
  const { isAuthenticated } = useAuth();
  const createReviewMutation = useCreateReviewMutation();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="bg-base-200/60 border border-base-300 rounded-3xl p-6 text-center space-y-3">
        <Star className="w-8 h-8 text-warning/50 mx-auto" />
        <h4 className="font-bold text-sm text-base-content">Have you purchased or used this gadget?</h4>
        <p className="text-xs text-base-content/60 max-w-sm mx-auto">
          Please log in to your GadgetAI account to share your rating and review.
        </p>
        <Link href={`/login?redirect=${encodeURIComponent(`/gadgets/${productId}`)}`}>
          <Button variant="primary" size="sm" leftIcon={<LogIn className="w-4 h-4" />}>
            Sign In to Write a Review
          </Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (rating < 1 || rating > 5) {
      setError("Please select a star rating from 1 to 5");
      return;
    }

    createReviewMutation.mutate(
      {
        productId,
        rating,
        comment: comment.trim() || undefined,
      },
      {
        onSuccess: () => {
          setSuccess("Thank you! Your product review has been submitted.");
          setComment("");
          setRating(5);
          setTimeout(() => setSuccess(null), 4000);
        },
        onError: (err) => {
          const msg =
            err.response?.data?.message || err.message || "Failed to submit review.";
          setError(msg);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl space-y-4">
      <h3 className="font-bold text-base text-base-content flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-primary" /> Write a Product Review
      </h3>

      {/* Success Notification */}
      {success && (
        <div className="alert alert-success shadow-lg rounded-2xl text-xs font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{success}</span>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="alert alert-error shadow-lg rounded-2xl text-xs font-bold text-white flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Star Rating Input */}
      <div>
        <label className="label py-1">
          <span className="label-text font-bold text-xs">Your Rating</span>
        </label>
        <RatingStars
          rating={rating}
          interactive
          onRatingChange={(r) => setRating(r)}
          size="lg"
        />
      </div>

      {/* Comment Input */}
      <div>
        <label className="label py-1">
          <span className="label-text font-bold text-xs">Feedback Comment (Optional)</span>
        </label>
        <textarea
          className="textarea textarea-bordered w-full bg-base-100 text-xs rounded-xl h-24 leading-relaxed"
          placeholder="Share details about performance, build quality, and battery life..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={createReviewMutation.isPending}
        leftIcon={<Star className="w-4 h-4" />}
      >
        {createReviewMutation.isPending ? "Submitting..." : "Post Review"}
      </Button>
    </form>
  );
}
