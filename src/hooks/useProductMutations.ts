"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import productService from "@/services/product.service";
import { CreateProductDTO, UpdateProductDTO, Product } from "@/types/product";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api";

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation<Product, AxiosError<ApiResponse<null>>, CreateProductDTO>({
    mutationFn: (data: CreateProductDTO) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation<Product, AxiosError<ApiResponse<null>>, { id: string; data: UpdateProductDTO }>({
    mutationFn: ({ id, data }) => productService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiResponse<null>>, string>({
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
