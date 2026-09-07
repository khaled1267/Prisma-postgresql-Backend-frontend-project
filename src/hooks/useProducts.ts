import { useQuery } from "@tanstack/react-query";
import productService from "@/services/product.service";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => productService.getAll(),
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getById(id),
    enabled: Boolean(id),
  });
}
