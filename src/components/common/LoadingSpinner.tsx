import { Cpu } from "lucide-react";

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = "Connecting to GadgetAI Backend..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 gap-4 text-center">
      <div className="relative">
        <span className="loading loading-ring loading-lg text-primary scale-150"></span>
        <Cpu className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      </div>
      <p className="text-sm font-semibold text-base-content/70 animate-pulse">{message}</p>
    </div>
  );
}
