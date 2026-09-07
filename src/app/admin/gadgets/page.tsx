"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import RoleGuard from "@/components/auth/RoleGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { useDeleteProductMutation } from "@/hooks/useProductMutations";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatters";
import { DEFAULT_PRODUCT_IMAGE } from "@/utils/constants";
import {
  Search,
  Filter,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  XCircle,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function AdminManageGadgetsPage() {
  const { data: products, isLoading, isError, error, refetch } = useProducts();
  const { data: categories } = useCategories();
  const deleteProductMutation = useDeleteProductMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Deletion Modal state
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products
      .filter((product) => {
        const matchesSearch =
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory =
          selectedCategory === "all" || product.categoryId === selectedCategory;

        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "in_stock" && product.stock > 0 && product.status !== "OUT_OF_STOCK") ||
          (statusFilter === "out_of_stock" && (product.stock <= 0 || product.status === "OUT_OF_STOCK"));

        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        const priceA = typeof a.price === "number" ? a.price : parseFloat(a.price) || 0;
        const priceB = typeof b.price === "number" ? b.price : parseFloat(b.price) || 0;

        if (sortBy === "price_asc") return priceA - priceB;
        if (sortBy === "price_desc") return priceB - priceA;
        if (sortBy === "stock_desc") return b.stock - a.stock;
        if (sortBy === "name") return a.title.localeCompare(b.title);
        // Default: newest
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
  }, [products, searchQuery, selectedCategory, statusFilter, sortBy]);

  const confirmDelete = () => {
    if (!productToDelete) return;

    deleteProductMutation.mutate(productToDelete.id, {
      onSuccess: () => {
        setToastMessage(`Product "${productToDelete.title}" successfully deleted.`);
        setProductToDelete(null);
        setTimeout(() => setToastMessage(null), 3000);
      },
      onError: (err) => {
        alert(err.response?.data?.message || err.message || "Failed to delete product.");
        setProductToDelete(null);
      },
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setStatusFilter("all");
    setSortBy("newest");
  };

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-base-100">
        
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl overflow-hidden">
          
          <AdminHeader
            title="Manage Hardware Inventory"
            description="View, edit, filter, or delete smart gadget listings in the database."
            onRefresh={() => refetch()}
          />

          {/* Success Toast Banner */}
          {toastMessage && (
            <div className="alert alert-success shadow-lg rounded-2xl text-xs font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Search, Filter, & Controls Bar */}
          <div className="bg-base-200 border border-base-300 rounded-3xl p-5 mb-6 shadow-lg space-y-4">
            
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="w-full sm:flex-1">
                <Input
                  placeholder="Search inventory by title or specs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4 text-primary" />}
                  rightIcon={
                    searchQuery ? (
                      <button onClick={() => setSearchQuery("")} className="hover:text-error">
                        <XCircle className="w-4 h-4" />
                      </button>
                    ) : undefined
                  }
                />
              </div>

              <Link href="/admin/gadgets/add">
                <Button variant="primary" size="md" leftIcon={<PlusCircle className="w-4 h-4" />}>
                  Add New Gadget
                </Button>
              </Link>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-base-300 text-xs">
              
              {/* Category Filter */}
              <div>
                <label className="label py-1">
                  <span className="label-text font-semibold text-xs flex items-center gap-1">
                    <Filter className="w-3 h-3 text-primary" /> Category
                  </span>
                </label>
                <select
                  className="select select-bordered select-sm w-full bg-base-100 rounded-xl"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="label py-1">
                  <span className="label-text font-semibold text-xs">Stock Status</span>
                </label>
                <select
                  className="select select-bordered select-sm w-full bg-base-100 rounded-xl"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Stock Statuses</option>
                  <option value="in_stock">In Stock Only</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </div>

              {/* Sorting Filter */}
              <div>
                <label className="label py-1">
                  <span className="label-text font-semibold text-xs">Sort By</span>
                </label>
                <select
                  className="select select-bordered select-sm w-full bg-base-100 rounded-xl"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="stock_desc">Highest Stock First</option>
                  <option value="name">Product Name (A-Z)</option>
                </select>
              </div>

            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-base-content/70">
              Total Managed Products: <span className="text-primary">{filteredProducts.length}</span>
            </span>

            {(searchQuery || selectedCategory !== "all" || statusFilter !== "all" || sortBy !== "newest") && (
              <button
                onClick={clearFilters}
                className="text-xs text-error hover:underline font-semibold flex items-center gap-1"
              >
                <XCircle className="w-3.5 h-3.5" /> Clear Filters
              </button>
            )}
          </div>

          {/* Loading Skeleton */}
          {isLoading && <LoadingComponent message="Loading database inventory..." />}

          {/* Error Alert */}
          {isError && (
            <ErrorComponent
              title="Failed to load products"
              message={error?.message || "Could not retrieve products from backend database."}
              onRetry={() => refetch()}
            />
          )}

          {/* Empty Inventory State */}
          {!isLoading && !isError && filteredProducts.length === 0 && (
            <div className="bg-base-200 border border-base-300 rounded-3xl p-12 text-center max-w-md mx-auto my-6">
              <AlertTriangle className="w-16 h-16 text-warning/50 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-base-content mb-1">No Products Match Filters</h3>
              <p className="text-xs text-base-content/60 mb-6">
                Try clearing your search query or category filters to view full inventory.
              </p>
              <Button variant="outline" size="sm" onClick={clearFilters}>
                Reset Filters
              </Button>
            </div>
          )}

          {/* Desktop Responsive Table Layout */}
          {!isLoading && !isError && filteredProducts.length > 0 && (
            <>
              <div className="hidden md:block bg-base-200 border border-base-300 rounded-3xl shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full text-xs">
                    <thead>
                      <tr className="text-base-content/70 uppercase font-bold text-[10px] bg-base-300/50">
                        <th>Gadget</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((p) => {
                        const img = p.image && p.image.trim().length > 0 ? p.image : DEFAULT_PRODUCT_IMAGE;
                        const isOutOfStock = p.stock <= 0 || p.status === "OUT_OF_STOCK";

                        return (
                          <tr key={p.id} className="hover">
                            
                            {/* Gadget Image & Title */}
                            <td>
                              <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-base-300 shrink-0 border border-base-300">
                                  <Image src={img} alt={p.title} fill className="object-cover" unoptimized />
                                </div>
                                <div className="overflow-hidden max-w-[200px]">
                                  <div className="font-bold text-base-content truncate">{p.title}</div>
                                  <div className="text-[10px] text-base-content/50 truncate font-mono">
                                    ID: {p.id}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td>
                              {p.category ? (
                                <span className="badge badge-primary/10 border-primary/20 text-primary font-bold text-[10px]">
                                  {p.category.name}
                                </span>
                              ) : (
                                <span className="text-base-content/50">Uncategorized</span>
                              )}
                            </td>

                            {/* Price */}
                            <td className="font-mono font-extrabold text-primary text-sm">
                              {formatCurrency(p.price)}
                            </td>

                            {/* Stock */}
                            <td className="font-bold">
                              {p.stock} units
                            </td>

                            {/* Status Badge */}
                            <td>
                              {isOutOfStock ? (
                                <span className="badge badge-error badge-xs font-bold text-white">
                                  OUT OF STOCK
                                </span>
                              ) : (
                                <span className="badge badge-success badge-xs font-bold text-white">
                                  ACTIVE
                                </span>
                              )}
                            </td>

                            {/* Action Buttons */}
                            <td className="text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                
                                {/* View */}
                                <Link href={`/gadgets/${p.id}`}>
                                  <button
                                    className="btn btn-ghost btn-square btn-xs text-info hover:bg-info/10"
                                    title="View Customer Details Page"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                </Link>

                                {/* Edit */}
                                <Link href={`/admin/gadgets/edit/${p.id}`}>
                                  <button
                                    className="btn btn-ghost btn-square btn-xs text-warning hover:bg-warning/10"
                                    title="Edit Product Details"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                </Link>

                                {/* Delete */}
                                <button
                                  onClick={() => setProductToDelete(p)}
                                  className="btn btn-ghost btn-square btn-xs text-error hover:bg-error/10"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>

                              </div>
                            </td>

                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card List Layout */}
              <div className="md:hidden space-y-4">
                {filteredProducts.map((p) => {
                  const img = p.image && p.image.trim().length > 0 ? p.image : DEFAULT_PRODUCT_IMAGE;
                  const isOutOfStock = p.stock <= 0 || p.status === "OUT_OF_STOCK";

                  return (
                    <div key={p.id} className="bg-base-200 border border-base-300 rounded-2xl p-4 shadow-lg space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-base-300 shrink-0 border border-base-300">
                          <Image src={img} alt={p.title} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <div className="font-bold text-sm text-base-content truncate">{p.title}</div>
                          <div className="text-primary font-black text-sm">{formatCurrency(p.price)}</div>
                          <div className="flex items-center gap-2 mt-1">
                            {p.category && (
                              <span className="badge badge-primary/10 border-primary/20 text-primary font-bold text-[9px]">
                                {p.category.name}
                              </span>
                            )}
                            {isOutOfStock ? (
                              <span className="badge badge-error badge-xs font-bold text-white text-[9px]">
                                Out of Stock
                              </span>
                            ) : (
                              <span className="badge badge-success badge-xs font-bold text-white text-[9px]">
                                In Stock ({p.stock})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Mobile Actions */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-base-300">
                        <Link href={`/gadgets/${p.id}`}>
                          <Button variant="outline" size="xs" leftIcon={<Eye className="w-3.5 h-3.5 text-info" />}>
                            View
                          </Button>
                        </Link>
                        <Link href={`/admin/gadgets/edit/${p.id}`}>
                          <Button variant="outline" size="xs" leftIcon={<Edit className="w-3.5 h-3.5 text-warning" />}>
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="error"
                          size="xs"
                          onClick={() => setProductToDelete(p)}
                          leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Delete Confirmation Modal */}
          <Modal
            isOpen={Boolean(productToDelete)}
            onClose={() => setProductToDelete(null)}
            title="⚠️ Confirm Product Deletion"
            description="Are you sure you want to delete this gadget listing? This action will remove the product entry from database."
            footerActions={
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setProductToDelete(null)}
                  disabled={deleteProductMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  variant="error"
                  size="sm"
                  onClick={confirmDelete}
                  isLoading={deleteProductMutation.isPending}
                  leftIcon={<Trash2 className="w-4 h-4" />}
                >
                  {deleteProductMutation.isPending ? "Deleting..." : "Confirm Delete"}
                </Button>
              </>
            }
          >
            {productToDelete && (
              <div className="p-4 bg-base-100 rounded-2xl border border-error/30 space-y-2 my-2">
                <div className="font-bold text-sm text-base-content">{productToDelete.title}</div>
                <div className="text-xs text-base-content/60 font-mono">ID: {productToDelete.id}</div>
                <div className="text-xs font-bold text-primary">Price: {formatCurrency(productToDelete.price)}</div>
              </div>
            )}
          </Modal>

        </main>
      </div>
    </RoleGuard>
  );
}
