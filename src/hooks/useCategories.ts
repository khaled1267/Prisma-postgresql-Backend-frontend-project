import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import categoryService from "@/services/category.service";
import { ApiResponse } from "@/types/api";
import { Category, CreateCategoryDTO } from "@/types/category";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
    refetchOnMount: "always",
  });
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    Category,
    AxiosError<ApiResponse<null>>,
    CreateCategoryDTO
  >({
    mutationFn: (data) => categoryService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryService.getById(id),
    enabled: Boolean(id),
  });
}
