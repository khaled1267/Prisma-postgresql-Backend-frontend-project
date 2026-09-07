"use client";

import React from "react";
import Image from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  image?: {
    src: string;
    alt: string;
    height?: number;
  };
  children?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "flat" | "bordered" | "glass";
  isCompact?: boolean;
  isHoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Card({
  title,
  subtitle,
  badge,
  image,
  children,
  footer,
  variant = "bordered",
  isCompact = false,
  isHoverable = true,
  className,
  onClick,
}: CardProps) {
  const variantClass = {
    flat: "bg-base-200 shadow-sm",
    bordered: "bg-base-200 border border-base-300 shadow-md",
    glass: "glass-panel shadow-xl",
  }[variant];

  return (
    <div
      onClick={onClick}
      className={twMerge(
        clsx(
          "card rounded-2xl overflow-hidden transition-all duration-300",
          variantClass,
          isCompact && "card-compact",
          isHoverable && "hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5",
          onClick && "cursor-pointer",
          className
        )
      )}
    >
      {/* Card Image */}
      {image && (
        <figure className="relative w-full h-48 bg-base-300 overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
          {badge && (
            <div className="absolute top-3 right-3 z-10">{badge}</div>
          )}
        </figure>
      )}

      {/* Card Body */}
      <div className="card-body p-5">
        {(title || badge) && !image && (
          <div className="flex justify-between items-start gap-2 mb-1">
            {typeof title === "string" ? (
              <h3 className="card-title text-base font-bold text-base-content">{title}</h3>
            ) : (
              title
            )}
            {badge}
          </div>
        )}

        {title && image && (
          <div className="flex justify-between items-start gap-2 mb-1">
            {typeof title === "string" ? (
              <h3 className="card-title text-base font-bold text-base-content">{title}</h3>
            ) : (
              title
            )}
          </div>
        )}

        {subtitle && (
          <p className="text-xs text-base-content/60 font-medium mb-2">{subtitle}</p>
        )}

        {children && <div className="text-xs text-base-content/80">{children}</div>}

        {footer && (
          <div className="card-actions justify-between items-center mt-4 pt-3 border-t border-base-300/80">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
