import { Product } from "./product";

export interface CartItem {
  id: string;
  quantity: number;
  userId?: string;
  productId: string;
  product: Product;
  createdAt?: string;
  updatedAt?: string;
}

export interface AddToCartDTO {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemDTO {
  quantity: number;
}
