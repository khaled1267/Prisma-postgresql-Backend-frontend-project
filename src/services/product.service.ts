import apiClient from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Product, CreateProductDTO, UpdateProductDTO } from "@/types/product";

export const productService = {
  // Get all products (Public)
  getAll: async (): Promise<Product[]> => {
    const response = await apiClient.get<ApiResponse<Product[]>>("/api/products");
    return response.data.data;
  },

  // Get product by ID (Public)
  getById: async (id: string): Promise<Product> => {
    const response = await apiClient.get<ApiResponse<Product>>(`/api/products/${id}`);
    return response.data.data;
  },

  // Create product (Admin)
  create: async (data: CreateProductDTO): Promise<Product> => {
    const response = await apiClient.post<ApiResponse<Product>>("/api/products", data);
    return response.data.data;
  },

  // Update product (Admin)
  update: async (id: string, data: UpdateProductDTO): Promise<Product> => {
    const response = await apiClient.put<ApiResponse<Product>>(`/api/products/${id}`, data);
    return response.data.data;
  },

  // Soft delete product (Admin)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/api/products/${id}`);
  },
};

export default productService;
