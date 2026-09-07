"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import orderService from "@/services/order.service";
import { CreateOrderDTO, OrderStatus, Order } from "@/types/order";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api";

export function useCreateOrderMutation() {
  const queryClient = useQueryClient();

  return useMutation<Order, AxiosError<ApiResponse<null>>, CreateOrderDTO>({
    mutationFn: (data: CreateOrderDTO) => orderService.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
    },
  });
}

export function useUpdateOrderStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation<Order, AxiosError<ApiResponse<null>>, { id: string; status: OrderStatus }>({
    mutationFn: ({ id, status }) => orderService.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });
}
