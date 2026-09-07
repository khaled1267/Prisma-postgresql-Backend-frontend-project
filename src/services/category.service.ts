import apiClient from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from "@/types/category";

export const categoryService = {
  // Get all categories (Public)
  getAll: async (): Promise<Category[]> => {
    const response = await apiClient.get<ApiResponse<Category[]>>("/api/categories");
    return response.data.data;
  },

  // Get category by ID (Public)
  getById: async (id: string): Promise<Category> => {
    const response = await apiClient.get<ApiResponse<Category>>(`/api/categories/${id}`);
    return response.data.data;
  },

  // Create category (Admin)
  create: async (data: CreateCategoryDTO): Promise<Category> => {
    const response = await apiClient.post<ApiResponse<Category>>("/api/categories", data);
    return response.data.data;
  },

  // Update category (Admin)
  update: async (id: string, data: UpdateCategoryDTO): Promise<Category> => {
    const response = await apiClient.put<ApiResponse<Category>>(`/api/categories/${id}`, data);
    return response.data.data;
  },

  // Soft delete category (Admin)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/api/categories/${id}`);
  },
};

export default categoryService;
