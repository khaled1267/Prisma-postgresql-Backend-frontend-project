"use client";

import React from "react";
import { AlertCircle, RefreshCw, XCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { clsx } from "clsx";
import { formatErrorMessage } from "@/utils/errorFormatter";

export interface ErrorComponentProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  actionLabel?: string;
  variant?: "alert" | "card" | "inline";
  className?: string;
}

export function ErrorComponent({
  title = "Something went wrong",
  message = "An error occurred while fetching or processing data.",
  onRetry,
  actionLabel = "Try Again",
  variant = "alert",
  className,
}: ErrorComponentProps) {
  const displayMessage = formatErrorMessage(message);

  if (variant === "inline") {
    return (
      <div className={clsx("flex items-center gap-2 text-error text-xs p-2 rounded-lg bg-error/10 border border-error/20", className)}>
        <XCircle className="w-4 h-4 shrink-0" />
        <span className="font-medium">{displayMessage}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="ml-auto font-bold underline hover:no-underline text-error"
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className={clsx("card bg-base-200 border border-error/30 shadow-xl max-w-md mx-auto p-6 text-center", className)}>
        <div className="mx-auto w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-base-content mb-1">{title}</h3>
        <p className="text-xs text-base-content/70 mb-6">{displayMessage}</p>
        {onRetry && (
          <Button variant="error" size="sm" onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
            {actionLabel}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={clsx("alert alert-error shadow-lg rounded-2xl max-w-2xl mx-auto my-6 border border-error/30", className)}>
      <AlertCircle className="w-5 h-5 shrink-0 text-white" />
      <div className="flex-1">
        <h4 className="font-bold text-sm text-white">{title}</h4>
        <p className="text-xs text-white/90">{displayMessage}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-xs btn-ghost text-white border-white/30 hover:bg-white/20 gap-1 rounded-lg"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default ErrorComponent;
