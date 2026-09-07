"use client";

import React from "react";
import { Cpu } from "lucide-react";
import { clsx } from "clsx";

export interface LoadingComponentProps {
  variant?: "ring" | "spinner" | "dots" | "skeleton";
  message?: string;
  size?: "sm" | "md" | "lg";
  isFullPage?: boolean;
  className?: string;
}

export function LoadingComponent({
  variant = "ring",
  message = "Loading GadgetAI data...",
  size = "md",
  isFullPage = false,
  className,
}: LoadingComponentProps) {
  const sizeClass = {
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg scale-125",
  }[size];

  if (variant === "skeleton") {
    return (
      <div className={clsx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="card bg-base-200 border border-base-300 p-4 gap-4 animate-pulse">
            <div className="skeleton h-44 w-full rounded-xl bg-base-300" />
            <div className="skeleton h-4 w-3/4 bg-base-300 rounded" />
            <div className="skeleton h-3 w-1/2 bg-base-300 rounded" />
            <div className="flex justify-between items-center mt-2">
              <div className="skeleton h-6 w-1/3 bg-base-300 rounded" />
              <div className="skeleton h-8 w-1/4 bg-base-300 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const containerContent = (
    <div className={clsx("flex flex-col items-center justify-center p-8 gap-4 text-center", className)}>
      <div className="relative flex items-center justify-center">
        {variant === "ring" && (
          <span className={clsx("loading loading-ring text-primary", sizeClass)} />
        )}
        {variant === "spinner" && (
          <span className={clsx("loading loading-spinner text-primary", sizeClass)} />
        )}
        {variant === "dots" && (
          <span className={clsx("loading loading-dots text-primary", sizeClass)} />
        )}
        <Cpu className="w-5 h-5 text-primary absolute animate-pulse pointer-events-none" />
      </div>
      {message && (
        <p className="text-xs font-semibold text-base-content/70 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );

  if (isFullPage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center w-full">
        {containerContent}
      </div>
    );
  }

  return containerContent;
}

export default LoadingComponent;
