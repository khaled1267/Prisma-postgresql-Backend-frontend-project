"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="bg-base-200/60 border border-dashed border-base-300 rounded-3xl p-10 text-center max-w-md mx-auto my-6 shadow-lg space-y-4">
      <div className="p-4 rounded-full bg-primary/10 text-primary w-16 h-16 mx-auto flex items-center justify-center border border-primary/20">
        {icon || <FolderOpen className="w-8 h-8 text-primary" />}
      </div>

      <div className="space-y-1">
        <h3 className="font-bold text-lg text-base-content">{title}</h3>
        {description && <p className="text-xs text-base-content/60 leading-relaxed max-w-xs mx-auto">{description}</p>}
      </div>

      {actionLabel && (
        <div className="pt-2">
          {actionHref ? (
            <Link href={actionHref}>
              <Button variant="primary" size="sm">
                {actionLabel}
              </Button>
            </Link>
          ) : (
            <Button variant="primary" size="sm" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
