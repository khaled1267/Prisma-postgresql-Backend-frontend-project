import apiClient from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { AiChatResponse, SendChatMessageDTO } from "@/types/ai";

export const aiService = {
  // Send user query to backend AI Assistant endpoint
  sendMessage: async (dto: SendChatMessageDTO): Promise<AiChatResponse> => {
    try {
      const response = await apiClient.post<ApiResponse<AiChatResponse>>("/api/ai/chat", dto);
      return response.data.data;
    } catch (error: any) {
      // Re-throw with clear message if backend endpoint is missing or returns error
      if (error.response?.status === 404) {
        throw new Error(
          "AI Assistant backend endpoint (/api/ai/chat) is not active on the server. Please contact your administrator."
        );
      }
      throw error;
    }
  },
};

export default aiService;
