import { Category } from "./category";

export type ProductStatus = "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";

export interface Product {
  id: string;
  title: string;
  description?: string | null;
  price: number | string;
  stock: number;
  image?: string | null;
  status: ProductStatus;
  categoryId: string;
  category?: Category;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDTO {
  title: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
  categoryId: string;
}

export interface UpdateProductDTO {
  title?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
  categoryId?: string;
}
