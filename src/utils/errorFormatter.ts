import { AxiosError } from "axios";

export function formatErrorMessage(error: unknown, fallbackMessage = "An unexpected error occurred. Please try again."): string {
  if (!error) return fallbackMessage;

  // Check if AxiosError
  if (typeof error === "object" && error !== null && "isAxiosError" in error && (error as AxiosError).isAxiosError) {
    const axiosError = error as AxiosError<{ message?: string; error?: string }>;
    
    // Network Error (No Internet / Server unreachable)
    if (!axiosError.response) {
      return "Network connection issue. Please check your internet or try again later.";
    }

    const status = axiosError.response.status;
    const backendMessage = axiosError.response.data?.message || axiosError.response.data?.error;

    // Map common HTTP status codes to user-friendly copy
    switch (status) {
      case 400:
        return backendMessage && !backendMessage.includes("Prisma")
          ? backendMessage
          : "Invalid input provided. Please verify your data and try again.";
      case 401:
        return "Your session has expired or authentication failed. Please sign in again.";
      case 403:
        return "Access denied. You do not have permission to access this feature.";
      case 404:
        return backendMessage || "The requested resource could not be found.";
      case 409:
        return backendMessage || "A record with these details already exists in the system.";
      case 422:
        return "Validation failed for submitted fields. Please check your entries.";
      case 500:
      case 502:
      case 503:
        return "Our servers encountered a temporary issue. Please try again in a few moments.";
      default:
        if (backendMessage && !backendMessage.includes("Prisma") && !backendMessage.includes("Error:")) {
          return backendMessage;
        }
        return fallbackMessage;
    }
  }

  // Error instance
  if (error instanceof Error) {
    if (error.message.includes("Network Error")) {
      return "Network connection issue. Please check your internet connection.";
    }
    return error.message;
  }

  // String error
  if (typeof error === "string") {
    return error;
  }

  return fallbackMessage;
}
