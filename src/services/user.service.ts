import apiClient from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { User, UpdateUserDTO } from "@/types/user";

export const userService = {
  // Get all users (Admin only)
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<ApiResponse<User[]>>("/api/users");
    return response.data.data;
  },

  // Get user by ID (Admin only)
  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>(`/api/users/${id}`);
    return response.data.data;
  },

  // Update user (Admin only)
  update: async (id: string, data: UpdateUserDTO): Promise<User> => {
    const response = await apiClient.put<ApiResponse<User>>(`/api/users/${id}`, data);
    return response.data.data;
  },

  // Delete user (Admin only)
  delete: async (id: string): Promise<void> => {
    await apiClient.delete<ApiResponse<null>>(`/api/users/${id}`);
  },
};

export default userService;
