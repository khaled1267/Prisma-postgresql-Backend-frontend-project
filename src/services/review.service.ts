import apiClient from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Review, CreateReviewDTO, UpdateReviewDTO } from "@/types/review";

export const reviewService = {
  // Get all reviews (Public)
  getAll: async (): Promise<Review[]> => {
    const response = await apiClient.get<ApiResponse<Review[]>>("/api/reviews");
    return response.data.data;
  },

  // Get review by ID (Public)
  getById: async (id: string): Promise<Review> => {
    const response = await apiClient.get<ApiResponse<Review>>(`/api/reviews/${id}`);
    return response.data.data;
  },

  // Create review (Logged-in user)
  create: async (data: CreateReviewDTO): Promise<Review> => {
    const response = await apiClient.post<ApiResponse<Review>>("/api/reviews", data);
    return response.data.data;
  },

  // Update review (Owner)
  update: async (id: string, data: UpdateReviewDTO): Promise<Review> => {
    const response = await apiClient.put<ApiResponse<Review>>(`/api/reviews/${id}`, data);
    return response.data.data;
  },

  // Delete review (Owner or Admin)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/api/reviews/${id}`);
  },
};

export default reviewService;
