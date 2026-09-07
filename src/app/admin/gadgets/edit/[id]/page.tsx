"use client";

import React, { use } from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import EditGadgetForm from "@/components/admin/EditGadgetForm";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import { useProduct } from "@/hooks/useProducts";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AdminEditGadgetPageProps {
  params: Promise<{ id: string }>;
}

export default function AdminEditGadgetPage({ params }: AdminEditGadgetPageProps) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const { data: product, isLoading, isError, error, refetch } = useProduct(productId);

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-base-100">
        
        {/* Admin Sidebar Navigation */}
        <AdminSidebar />

        {/* Main Admin Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl overflow-hidden">
          <AdminHeader
            title="Edit Gadget Details"
            description={`Modifying product listing: ${product?.title || productId}`}
          />

          {isLoading && <LoadingComponent message="Fetching gadget details from database..." />}

          {isError || (!isLoading && !product) ? (
            <div className="space-y-4">
              <ErrorComponent
                title="Gadget Not Found"
                message={error?.message || "Could not locate product entry for editing."}
                onRetry={() => refetch()}
              />
              <Link href="/admin/gadgets" className="block text-center">
                <Button variant="outline" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Return to Manage Gadgets
                </Button>
              </Link>
            </div>
          ) : null}

          {!isLoading && product && <EditGadgetForm product={product} />}
        </main>

      </div>
    </RoleGuard>
  );
}
