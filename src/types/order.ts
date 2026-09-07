import { Product } from "./product";
import { User } from "./user";

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
  id: string;
  quantity: number;
  price: number | string;
  orderId: string;
  productId: string;
  product?: Product;
  createdAt?: string;
  updatedAt?: string;
}

export interface Order {
  id: string;
  totalAmount: number | string;
  status: OrderStatus;
  userId: string;
  user?: Partial<User>;
  items: OrderItem[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderItemDTO {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderDTO {
  items: CreateOrderItemDTO[];
  totalAmount: number;
}

export interface UpdateOrderStatusDTO {
  status: OrderStatus;
}
