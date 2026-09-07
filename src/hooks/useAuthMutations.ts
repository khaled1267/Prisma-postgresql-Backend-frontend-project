"use client";

import { useMutation } from "@tanstack/react-query";
import authService from "@/services/auth.service";
import { RegisterInput, RegisterSuccessData } from "@/types/auth";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/api";

export function useRegisterMutation() {
  return useMutation<RegisterSuccessData, AxiosError<ApiResponse<null>>, RegisterInput>({
    mutationFn: (data: RegisterInput) => authService.register(data),
  });
}
