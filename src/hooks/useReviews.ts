import { useQuery } from "@tanstack/react-query";
import reviewService from "@/services/review.service";

export function useReviews() {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => reviewService.getAll(),
  });
}
