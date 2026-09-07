"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import reviewService from "@/services/review.service";
import { CreateReviewDTO, UpdateReviewDTO, Review } from "@/types/review";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api";

export function useCreateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation<Review, AxiosError<ApiResponse<null>>, CreateReviewDTO>({
    mutationFn: (data: CreateReviewDTO) => reviewService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

export function useUpdateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation<Review, AxiosError<ApiResponse<null>>, { id: string; data: UpdateReviewDTO }>({
    mutationFn: ({ id, data }) => reviewService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

export function useDeleteReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiResponse<null>>, string>({
    mutationFn: (id: string) => reviewService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
