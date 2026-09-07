import { Product } from "./product";

export interface ReviewUser {
  id: string;
  name: string;
  email: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  userId: string;
  productId: string;
  user?: ReviewUser;
  product?: Product;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewDTO {
  productId: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewDTO {
  rating?: number;
  comment?: string;
}
