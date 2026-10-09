"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { PlusCircle, RefreshCw, ShieldCheck } from "lucide-react";

interface AdminHeaderProps {
  title: string;
  description?: string;
  onRefresh?: () => void;
}

export default function AdminHeader({ title, description, onRefresh }: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl">
      <div>
        <div className="mb-1 flex items-center gap-2">
          <span className="badge badge-accent badge-sm gap-1 text-[10px] font-bold uppercase">
            <ShieldCheck className="h-3 w-3" /> Marketplace administration
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight">{title}</h1>
        {description && <p className="text-xs text-base-content/60 mt-1">{description}</p>}
      </div>

      <div className="flex items-center gap-2">
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh
          </Button>
        )}
        <Link href="/admin/gadgets/add">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Add Gadget
          </Button>
        </Link>
      </div>
    </div>
  );
}
