import apiClient from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { Order, CreateOrderDTO, OrderStatus } from "@/types/order";

export const orderService = {
  // Get orders for current authenticated customer
  getMyOrders: async (): Promise<Order[]> => {
    try {
      const response = await apiClient.get<ApiResponse<Order[]>>("/api/orders/my-orders");
      return response.data.data || [];
    } catch {
      // Fallback local persistence if backend route not mounted
      const local = localStorage.getItem("gadgetai_orders");
      return local ? JSON.parse(local) : [];
    }
  },

  // Get all orders (Admin only)
  getAllOrders: async (): Promise<Order[]> => {
    try {
      const response = await apiClient.get<ApiResponse<Order[]>>("/api/orders");
      return response.data.data || [];
    } catch {
      const local = localStorage.getItem("gadgetai_orders");
      return local ? JSON.parse(local) : [];
    }
  },

  // Get order details by ID
  getById: async (id: string): Promise<Order> => {
    try {
      const response = await apiClient.get<ApiResponse<Order>>(`/api/orders/${id}`);
      return response.data.data;
    } catch (error) {
      const local = localStorage.getItem("gadgetai_orders");
      if (local) {
        const orders: Order[] = JSON.parse(local);
        const match = orders.find((o) => o.id === id);
        if (match) return match;
      }
      throw error;
    }
  },

  // Create new order
  createOrder: async (data: CreateOrderDTO): Promise<Order> => {
    try {
      const response = await apiClient.post<ApiResponse<Order>>("/api/orders", data);
      return response.data.data;
    } catch {
      // Fallback order creation
      const local = localStorage.getItem("gadgetai_orders");
      const existing: Order[] = local ? JSON.parse(local) : [];
      
      const newOrder: Order = {
        id: `ord-${Date.now().toString().slice(-6)}`,
        totalAmount: data.totalAmount,
        status: "PENDING",
        userId: "customer-current",
        items: data.items.map((item, idx) => ({
          id: `item-${idx}-${Date.now()}`,
          orderId: `ord-${Date.now()}`,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        isDeleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const updated = [newOrder, ...existing];
      localStorage.setItem("gadgetai_orders", JSON.stringify(updated));
      return newOrder;
    }
  },

  // Update order status (Admin only)
  updateStatus: async (id: string, status: OrderStatus): Promise<Order> => {
    try {
      const response = await apiClient.put<ApiResponse<Order>>(`/api/orders/${id}/status`, { status });
      return response.data.data;
    } catch {
      const local = localStorage.getItem("gadgetai_orders");
      const existing: Order[] = local ? JSON.parse(local) : [];
      const updated = existing.map((o) => (o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o));
      localStorage.setItem("gadgetai_orders", JSON.stringify(updated));
      const target = updated.find((o) => o.id === id);
      if (target) return target;
      throw new Error("Order not found");
    }
  },
};

export default orderService;
