"use client";

import Link from "next/link";
import PageContainer from "@/components/ui/PageContainer";
import Button from "@/components/ui/Button";
import { Home, Compass, AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <PageContainer maxWidth="7xl" className="py-16">
      <div className="bg-base-200 border border-base-300 rounded-3xl p-10 sm:p-16 text-center max-w-xl mx-auto shadow-2xl space-y-6">
        
        <div className="relative inline-block">
          <div className="text-8xl sm:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary via-info to-secondary select-none tracking-tight">
            404
          </div>
          <div className="absolute -bottom-2 right-0 p-2 rounded-2xl bg-base-100 border border-base-300 shadow-lg text-primary">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-base-content">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60 leading-relaxed max-w-sm mx-auto">
            The page or smart gadget resource you are searching for might have been moved, deleted, or does not exist.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Link href="/">
            <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
              Return to Home
            </Button>
          </Link>
          <Link href="/gadgets">
            <Button variant="outline" size="md" leftIcon={<Compass className="w-4 h-4" />}>
              Explore Gadgets
            </Button>
          </Link>
        </div>

      </div>
    </PageContainer>
  );
}
