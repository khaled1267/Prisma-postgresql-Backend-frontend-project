"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user.service";
import { UpdateUserDTO, User } from "@/types/user";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userService.getAll(),
  });
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    User,
    AxiosError<ApiResponse<null>>,
    { id: string; data: UpdateUserDTO }
  >({
    mutationFn: ({ id, data }) => userService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
