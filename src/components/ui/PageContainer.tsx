"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageContainerProps {
  title?: React.ReactNode;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  backHref?: string;
  backLabel?: string;
  action?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "7xl" | "full";
  className?: string;
  children: React.ReactNode;
}

export function PageContainer({
  title,
  description,
  breadcrumbs,
  backHref,
  backLabel = "Back",
  action,
  maxWidth = "7xl",
  className,
  children,
}: PageContainerProps) {
  const maxWidthClass = {
    sm: "max-w-screen-sm",
    md: "max-w-screen-md",
    lg: "max-w-screen-lg",
    xl: "max-w-screen-xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
  }[maxWidth];

  return (
    <div className="w-full flex-1 py-8 px-4 sm:px-6 lg:px-8">
      <div className={twMerge(clsx("mx-auto w-full", maxWidthClass, className))}>
        {/* Back Link */}
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-xs font-semibold text-base-content/60 hover:text-primary transition mb-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{backLabel}</span>
          </Link>
        )}

        {/* Breadcrumb Navigation */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="breadcrumbs text-xs text-base-content/60 mb-4">
            <ul className="flex items-center gap-1">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-1">
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-primary transition">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-base-content">{crumb.label}</span>
                  )}
                  {idx < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-base-content/40 ml-1" />
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Page Header */}
        {(title || action || description) && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-base-300/80">
            <div>
              {typeof title === "string" ? (
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-base-content">
                  {title}
                </h1>
              ) : (
                title
              )}
              {description && (
                <p className="text-xs sm:text-sm text-base-content/60 mt-1 max-w-2xl">
                  {description}
                </p>
              )}
            </div>

            {action && <div className="flex items-center gap-2 shrink-0">{action}</div>}
          </div>
        )}

        {/* Page Main Content */}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default PageContainer;
