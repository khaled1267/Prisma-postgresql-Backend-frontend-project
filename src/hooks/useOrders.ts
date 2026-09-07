"use client";

import { useQuery } from "@tanstack/react-query";
import orderService from "@/services/order.service";

export function useMyOrders() {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: () => orderService.getMyOrders(),
  });
}

export function useAllOrders() {
  return useQuery({
    queryKey: ["all-orders"],
    queryFn: () => orderService.getAllOrders(),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getById(id),
    enabled: Boolean(id),
  });
}
