"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "ghost"
    | "outline"
    | "error"
    | "success"
    | "warning";
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      isFullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const variantClass = {
      primary: "btn-primary shadow-lg shadow-primary/20",
      secondary: "btn-secondary",
      accent: "btn-accent text-base-100",
      neutral: "btn-neutral",
      ghost: "btn-ghost hover:bg-base-200",
      outline: "btn-outline border-base-300 hover:bg-base-200",
      error: "btn-error text-white",
      success: "btn-success text-white",
      warning: "btn-warning text-base-100",
    }[variant];

    const sizeClass = {
      xs: "btn-xs text-xs px-2.5",
      sm: "btn-sm text-xs px-3.5",
      md: "btn-md text-sm px-5",
      lg: "btn-lg text-base px-7",
    }[size];

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            "btn rounded-xl font-semibold transition-all active:scale-[0.98] gap-2",
            variantClass,
            sizeClass,
            isFullWidth && "w-full flex",
            className
          )
        )}
        {...props}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-xs" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
