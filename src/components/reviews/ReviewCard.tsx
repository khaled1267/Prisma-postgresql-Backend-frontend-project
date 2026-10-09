"use client";

import { useState } from "react";
import { Review } from "@/types/review";
import RatingStars from "@/components/reviews/RatingStars";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useDeleteReviewMutation, useUpdateReviewMutation } from "@/hooks/useReviewMutations";
import { formatDate } from "@/utils/formatters";
import { Edit, Trash2, User as UserIcon, CheckCircle2, AlertCircle } from "lucide-react";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const { user, isAuthenticated } = useAuth();
  const deleteReviewMutation = useDeleteReviewMutation();
  const updateReviewMutation = useUpdateReviewMutation();

  const isOwner = isAuthenticated && user?.id === review.userId;
  const isAdmin = isAuthenticated && user?.role === "ADMIN";
  const canDelete = isOwner || isAdmin;
  const canEdit = isOwner;

  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(review.rating);
  const [editComment, setEditComment] = useState(review.comment || "");
  const [editError, setEditError] = useState<string | null>(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleUpdate = () => {
    setEditError(null);

    if (editRating < 1 || editRating > 5) {
      setEditError("Rating must be between 1 and 5 stars");
      return;
    }

    updateReviewMutation.mutate(
      {
        id: review.id,
        data: {
          rating: editRating,
          comment: editComment.trim() || undefined,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
        onError: (err) => {
          setEditError(err.response?.data?.message || err.message || "Failed to update review.");
        },
      }
    );
  };

  const handleDelete = () => {
    deleteReviewMutation.mutate(review.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      },
      onError: (err) => {
        alert(err.response?.data?.message || err.message || "Failed to delete review.");
        setIsDeleteModalOpen(false);
      },
    });
  };

  const reviewerName = review.user?.name || "Marketplace member";
  const initial = reviewerName.charAt(0).toUpperCase();

  return (
    <div className="bg-base-200 border border-base-300 rounded-3xl p-5 shadow-lg space-y-3">
      {/* Header: User avatar, Name, Rating, & Actions */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/20 text-primary font-black text-xs flex items-center justify-center border border-primary/30">
            {initial}
          </div>
          <div>
            <div className="font-bold text-xs text-base-content flex items-center gap-1.5">
              <span>{reviewerName}</span>
              {isOwner && (
                <span className="badge badge-primary badge-xs text-[9px] font-bold">You</span>
              )}
            </div>
            <div className="text-[10px] text-base-content/50">
              {formatDate(review.createdAt)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <RatingStars rating={review.rating} size="sm" />

          {/* Action Buttons */}
          <div className="flex items-center gap-1 ml-2">
            {canEdit && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-ghost btn-square btn-xs text-warning hover:bg-warning/10"
                title="Edit your review"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
            )}

            {canDelete && (
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="btn btn-ghost btn-square btn-xs text-error hover:bg-error/10"
                title="Delete review"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Review Comment Text */}
      {review.comment ? (
        <p className="pl-12 text-xs leading-relaxed text-base-content/80">
          {review.comment}
        </p>
      ) : (
        <p className="pl-12 text-xs text-base-content/50">
          No written comment was provided with this rating.
        </p>
      )}

      {/* Edit Review Modal */}
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        title="Edit Your Product Review"
        description="Update your star rating and feedback comment."
        footerActions={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleUpdate}
              isLoading={updateReviewMutation.isPending}
            >
              Save Changes
            </Button>
          </>
        }
      >
        <div className="space-y-4 my-2">
          {editError && (
            <div className="alert alert-error text-xs font-bold text-white p-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{editError}</span>
            </div>
          )}

          <div>
            <label className="label py-1">
              <span className="label-text font-bold text-xs">Rating</span>
            </label>
            <RatingStars
              rating={editRating}
              interactive
              onRatingChange={(r) => setEditRating(r)}
              size="lg"
            />
          </div>

          <div>
            <label className="label py-1">
              <span className="label-text font-bold text-xs">Comment</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full bg-base-100 text-xs rounded-xl h-24"
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
            />
          </div>
        </div>
      </Modal>

      {/* Delete Review Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Review Confirmation"
        description="Are you sure you want to delete this review? This action cannot be undone."
        footerActions={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="error"
              size="sm"
              onClick={handleDelete}
              isLoading={deleteReviewMutation.isPending}
            >
              Confirm Delete
            </Button>
          </>
        }
      >
        <div className="p-3 bg-base-100 rounded-xl border border-error/20 text-xs space-y-1 my-2">
          <div className="font-bold text-base-content">{reviewerName}</div>
          <div className="text-base-content/70 italic font-mono font-normal">{review.comment}</div>
        </div>
      </Modal>
    </div>
  );
}
