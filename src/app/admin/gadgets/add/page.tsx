"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AddGadgetForm from "@/components/admin/AddGadgetForm";

export default function AdminAddGadgetPage() {
  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-base-100">
        
        {/* Admin Sidebar Navigation */}
        <AdminSidebar />

        {/* Main Admin Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl overflow-hidden">
          <AdminHeader
            title="Create New Gadget Listing"
            description="Add a new smart hardware device or AI gadget to the database catalog."
          />

          <AddGadgetForm />
        </main>

      </div>
    </RoleGuard>
  );
}
