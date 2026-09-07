"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "bordered" | "ghost";
  inputSize?: "sm" | "md" | "lg";
  isFullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      variant = "bordered",
      inputSize = "md",
      isFullWidth = true,
      className,
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    const sizeClass = {
      sm: "input-sm text-xs",
      md: "input-md text-sm",
      lg: "input-lg text-base",
    }[inputSize];

    const variantClass = {
      bordered: "input-bordered bg-base-200/50 focus:bg-base-200 focus:input-primary",
      ghost: "input-ghost bg-base-200/30 focus:bg-base-200",
    }[variant];

    return (
      <div className={clsx("form-control", isFullWidth && "w-full")}>
        {label && (
          <label htmlFor={inputId} className="label py-1">
            <span className="label-text font-medium text-xs text-base-content/80">
              {label}
            </span>
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 z-10 text-base-content/50 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={twMerge(
              clsx(
                "input w-full rounded-xl transition-all duration-200",
                sizeClass,
                variantClass,
                leftIcon && "pl-10",
                rightIcon && "pr-10",
                error && "input-error focus:input-error",
                className
              )
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 z-10 text-base-content/50">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <label className="label py-1">
            <span
              className={clsx(
                "label-text-alt text-xs",
                error ? "text-error font-medium" : "text-base-content/50"
              )}
            >
              {error || helperText}
            </span>
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
