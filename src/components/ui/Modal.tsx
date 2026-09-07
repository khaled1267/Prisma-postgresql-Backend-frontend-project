"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footerActions?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  footerActions,
  size = "md",
  className,
}: ModalProps) {
  // Lock background scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClass = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  }[size];

  return (
    <div className="modal modal-open z-50 backdrop-blur-sm bg-black/60 transition-opacity">
      <div
        className={twMerge(
          clsx(
            "modal-box relative bg-base-200 border border-base-300 shadow-2xl rounded-2xl p-6 w-full",
            sizeClass,
            className
          )
        )}
      >
        {/* Close Icon Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-base-content/60 hover:text-base-content"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        {(title || description) && (
          <div className="mb-4 pr-6">
            {title && (
              <h3 className="text-xl font-bold text-base-content">{title}</h3>
            )}
            {description && (
              <p className="text-xs text-base-content/60 mt-1">{description}</p>
            )}
          </div>
        )}

        {/* Modal Body Content */}
        <div className="py-2">{children}</div>

        {/* Modal Footer Actions */}
        {footerActions && (
          <div className="modal-action mt-6 pt-4 border-t border-base-300 gap-2">
            {footerActions}
          </div>
        )}
      </div>

      {/* Backdrop overlay listener */}
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}

export default Modal;
