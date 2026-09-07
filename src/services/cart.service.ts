import apiClient from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { CartItem, AddToCartDTO, UpdateCartItemDTO } from "@/types/cart";

export const cartService = {
  // Get cart items for authenticated user
  getCart: async (): Promise<CartItem[]> => {
    try {
      const response = await apiClient.get<ApiResponse<CartItem[]>>("/api/cart-items");
      return response.data.data || [];
    } catch {
      // Fallback if backend endpoint is not active
      const localCart = localStorage.getItem("gadgetai_cart");
      return localCart ? JSON.parse(localCart) : [];
    }
  },

  // Add item to cart
  addItem: async (data: AddToCartDTO): Promise<CartItem> => {
    try {
      const response = await apiClient.post<ApiResponse<CartItem>>("/api/cart-items", data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Update item quantity in cart
  updateItem: async (id: string, data: UpdateCartItemDTO): Promise<CartItem> => {
    try {
      const response = await apiClient.put<ApiResponse<CartItem>>(`/api/cart-items/${id}`, data);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove item from cart
  removeItem: async (id: string): Promise<void> => {
    try {
      await apiClient.delete<ApiResponse<null>>(`/api/cart-items/${id}`);
    } catch (error) {
      throw error;
    }
  },

  // Clear all items from cart
  clearCart: async (): Promise<void> => {
    try {
      await apiClient.delete<ApiResponse<null>>("/api/cart-items");
    } catch (error) {
      throw error;
    }
  },
};

export default cartService;
