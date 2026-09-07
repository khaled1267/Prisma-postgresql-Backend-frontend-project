"use client";

import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import Button from "@/components/ui/Button";
import { ShieldAlert, Home, LogIn, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <PageContainer maxWidth="7xl" className="py-16">
      <div className="bg-base-200 border border-base-300 rounded-3xl p-10 sm:p-16 text-center max-w-xl mx-auto shadow-2xl space-y-6">
        
        <div className="p-5 rounded-full bg-error/10 text-error w-24 h-24 mx-auto flex items-center justify-center border border-error/20 shadow-xl">
          <ShieldAlert className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="badge badge-error font-bold text-xs text-white p-2.5">
            403 FORBIDDEN ACCESS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-base-content">
            Access Unauthorized
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60 leading-relaxed max-w-sm mx-auto">
            You do not have the required role authorization to access this area. Admin privileges are required for restricted management routes.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/login">
            <Button variant="primary" size="md" leftIcon={<LogIn className="w-4 h-4" />}>
              Sign In with Admin Account
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return to Marketplace Home
            </Button>
          </Link>
        </div>

      </div>
    </PageContainer>
  );
}
