import apiClient from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { RegisterInput, RegisterSuccessData, LoginInput, LoginSuccessData } from "@/types/auth";

export const authService = {
  // Register user (POST /api/auth/register)
  register: async (data: RegisterInput): Promise<RegisterSuccessData> => {
    const response = await apiClient.post<ApiResponse<RegisterSuccessData>>("/api/auth/register", data);
    return response.data.data;
  },

  // Login user (POST /api/auth/login)
  login: async (data: LoginInput): Promise<LoginSuccessData> => {
    const response = await apiClient.post<ApiResponse<LoginSuccessData>>("/api/auth/login", data);
    return response.data.data;
  },
};

export default authService;
