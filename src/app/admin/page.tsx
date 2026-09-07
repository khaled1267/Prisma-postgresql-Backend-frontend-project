"use client";

import RoleGuard from "@/components/auth/RoleGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useUsers } from "@/hooks/useUsers";
import { useReviews } from "@/hooks/useReviews";
import { formatCurrency, formatDate } from "@/utils/formatters";
import Link from "next/link";
import {
  Cpu,
  Layers,
  Users,
  Star,
  PlusCircle,
  Compass,
  CheckCircle,
  AlertTriangle,
  Server,
  Database,
  Lock,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function AdminDashboardPage() {
  const { data: products, isLoading: isLoadingProducts, refetch: refetchProducts } = useProducts();
  const { data: categories, isLoading: isLoadingCategories, refetch: refetchCategories } = useCategories();
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers, error: usersError, refetch: refetchUsers } = useUsers();
  const { data: reviews, isLoading: isLoadingReviews, refetch: refetchReviews } = useReviews();

  const handleRefreshAll = () => {
    refetchProducts();
    refetchCategories();
    refetchUsers();
    refetchReviews();
  };

  const isLoadingStats = isLoadingProducts || isLoadingCategories || isLoadingUsers || isLoadingReviews;

  // Compute stats from real backend APIs
  const totalProducts = products?.length || 0;
  const totalCategories = categories?.length || 0;
  const totalUsers = users?.length || 0;
  const totalReviews = reviews?.length || 0;

  // Recent 5 products
  const recentProducts = (products || []).slice(0, 5);

  // Recent 5 users
  const recentUsers = (users || []).slice(0, 5);

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-base-100">
        
        {/* Admin Sidebar Navigation */}
        <AdminSidebar />

        {/* Main Admin Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl overflow-hidden">
          
          <AdminHeader
            title="Admin Dashboard Statistics"
            description="Real-time hardware inventory, user accounts, and system status from Express/Prisma backend."
            onRefresh={handleRefreshAll}
          />

          {/* Loading Indicator for Stats */}
          {isLoadingStats && (
            <div className="mb-6">
              <LoadingComponent message="Calculating real backend API metrics..." />
            </div>
          )}

          {/* Statistics Grid */}
          {!isLoadingStats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              {/* Stat 1: Total Products */}
              <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-primary/50 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                    Total Gadgets
                  </span>
                  <div className="p-2.5 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                    <Cpu className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-primary mt-2">
                  {totalProducts}
                </div>
                <p className="text-[11px] text-base-content/50 mt-1">Active inventory count</p>
              </div>

              {/* Stat 2: Total Categories */}
              <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-secondary/50 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                    Categories
                  </span>
                  <div className="p-2.5 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20">
                    <Layers className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-secondary mt-2">
                  {totalCategories}
                </div>
                <p className="text-[11px] text-base-content/50 mt-1">Hardware divisions</p>
              </div>

              {/* Stat 3: Total Users */}
              <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-warning/50 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                    Registered Users
                  </span>
                  <div className="p-2.5 rounded-2xl bg-warning/10 text-warning border border-warning/20">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-warning mt-2">
                  {totalUsers}
                </div>
                <p className="text-[11px] text-base-content/50 mt-1">Customer & Admin accounts</p>
              </div>

              {/* Stat 4: Total Customer Reviews */}
              <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl relative overflow-hidden group hover:border-success/50 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                    Customer Reviews
                  </span>
                  <div className="p-2.5 rounded-2xl bg-success/10 text-success border border-success/20">
                    <Star className="w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-black text-success mt-2">
                  {totalReviews}
                </div>
                <p className="text-[11px] text-base-content/50 mt-1">Marketplace feedback entries</p>
              </div>

            </div>
          )}

          {/* Recent Products & Recent Users Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Table 1: Recent Gadget Products */}
            <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-base-300">
                <div>
                  <h3 className="font-bold text-lg text-base-content flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-primary" /> Recent Inventory Listings
                  </h3>
                  <p className="text-xs text-base-content/60">Latest hardware entries in database</p>
                </div>
                <Link href="/admin/gadgets">
                  <Button variant="ghost" size="xs" className="text-primary font-bold">
                    View All
                  </Button>
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-xs">
                  <thead>
                    <tr className="text-base-content/60 uppercase font-bold text-[10px]">
                      <th>Title</th>
                      <th>Price</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProducts.length > 0 ? (
                      recentProducts.map((p) => (
                        <tr key={p.id}>
                          <td className="font-semibold">{p.title}</td>
                          <td className="font-mono text-primary font-bold">
                            {formatCurrency(p.price)}
                          </td>
                          <td>
                            {p.stock > 0 ? (
                              <span className="badge badge-success badge-xs font-bold text-white">
                                {p.stock} in stock
                              </span>
                            ) : (
                              <span className="badge badge-error badge-xs font-bold text-white">
                                Out of stock
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="text-center py-4 text-base-content/50">
                          No product entries found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Recent Registered Users */}
            <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-base-300">
                <div>
                  <h3 className="font-bold text-lg text-base-content flex items-center gap-2">
                    <Users className="w-5 h-5 text-warning" /> Registered Accounts
                  </h3>
                  <p className="text-xs text-base-content/60">Fetched via GET /api/users</p>
                </div>
                <span className="badge badge-accent badge-xs font-bold text-white">
                  Admin Authorized
                </span>
              </div>

              {isErrorUsers ? (
                <ErrorComponent title="Failed to fetch users" message={usersError?.message} />
              ) : (
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full text-xs">
                    <thead>
                      <tr className="text-base-content/60 uppercase font-bold text-[10px]">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.length > 0 ? (
                        recentUsers.map((u) => (
                          <tr key={u.id}>
                            <td className="font-semibold">{u.name}</td>
                            <td className="text-base-content/70">{u.email}</td>
                            <td>
                              <span
                                className={`badge badge-xs font-bold uppercase text-[9px] ${
                                  u.role === "ADMIN" ? "badge-accent text-white" : "badge-neutral"
                                }`}
                              >
                                {u.role}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center py-4 text-base-content/50">
                            No registered users retrieved.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

          {/* System & Backend API Health Panel */}
          <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-base text-base-content flex items-center gap-2">
              <Server className="w-5 h-5 text-success" /> Production Server & Database Health
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-base-100/70 rounded-2xl border border-base-300 flex items-center gap-3">
                <Server className="w-5 h-5 text-success shrink-0" />
                <div>
                  <div className="font-bold text-base-content">Express Backend</div>
                  <div className="text-[10px] text-base-content/60 truncate">Render Cloud Deployment</div>
                </div>
              </div>

              <div className="p-4 bg-base-100/70 rounded-2xl border border-base-300 flex items-center gap-3">
                <Database className="w-5 h-5 text-info shrink-0" />
                <div>
                  <div className="font-bold text-base-content">PostgreSQL Database</div>
                  <div className="text-[10px] text-base-content/60">Prisma ORM Managed</div>
                </div>
              </div>

              <div className="p-4 bg-base-100/70 rounded-2xl border border-base-300 flex items-center gap-3">
                <Lock className="w-5 h-5 text-accent shrink-0" />
                <div>
                  <div className="font-bold text-base-content">JWT Authorization</div>
                  <div className="text-[10px] text-base-content/60">Bearer Token Interceptors</div>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </RoleGuard>
  );
}
