"use client";

import { useState, useMemo } from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useAllOrders } from "@/hooks/useOrders";
import { useUpdateOrderStatusMutation } from "@/hooks/useOrderMutations";
import { Order, OrderStatus } from "@/types/order";
import { formatCurrency, formatDate } from "@/utils/formatters";
import {
  Package,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Eye,
  RefreshCw,
  Edit,
} from "lucide-react";

export default function AdminManageOrdersPage() {
  const { data: orders, isLoading, isError, error, refetch } = useAllOrders();
  const updateStatusMutation = useUpdateOrderStatusMutation();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter Logic
  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (order.user?.name && order.user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (order.user?.email && order.user.email.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === "all" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateStatusMutation.mutate(
      { id: orderId, status: newStatus },
      {
        onSuccess: (updated) => {
          setToastMessage(`Order #${updated.id} status updated to ${updated.status}`);
          setTimeout(() => setToastMessage(null), 3000);
        },
        onError: (err) => {
          alert(err.response?.data?.message || err.message || "Failed to update order status.");
        },
      }
    );
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return <span className="badge badge-warning font-bold text-white text-[10px] gap-1"><Clock className="w-3 h-3" /> PENDING</span>;
      case "PROCESSING":
        return <span className="badge badge-info font-bold text-white text-[10px] gap-1"><Package className="w-3 h-3" /> PROCESSING</span>;
      case "SHIPPED":
        return <span className="badge badge-secondary font-bold text-white text-[10px] gap-1"><Truck className="w-3 h-3" /> SHIPPED</span>;
      case "DELIVERED":
        return <span className="badge badge-success font-bold text-white text-[10px] gap-1"><CheckCircle2 className="w-3 h-3" /> DELIVERED</span>;
      case "CANCELLED":
        return <span className="badge badge-error font-bold text-white text-[10px] gap-1"><XCircle className="w-3 h-3" /> CANCELLED</span>;
      default:
        return <span className="badge badge-neutral font-bold text-[10px]">{status}</span>;
    }
  };

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="flex flex-col lg:flex-row min-h-screen bg-base-100">
        
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Main Admin Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl overflow-hidden">
          
          <AdminHeader
            title="Manage Customer Orders"
            description="View, track, and update fulfillment status for customer marketplace orders."
            onRefresh={() => refetch()}
          />

          {/* Success Toast */}
          {toastMessage && (
            <div className="alert alert-success shadow-lg rounded-2xl text-xs font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Controls Bar */}
          <div className="bg-base-200 border border-base-300 rounded-3xl p-5 mb-6 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="w-full sm:flex-1">
                <Input
                  placeholder="Search by Order ID, customer name, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-4 h-4 text-primary" />}
                />
              </div>

              <div className="w-full sm:w-48">
                <select
                  className="select select-bordered select-sm w-full bg-base-100 rounded-xl text-xs font-semibold"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Order Statuses</option>
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoading && <LoadingComponent message="Loading database order records..." />}

          {/* Error Alert */}
          {isError && (
            <ErrorComponent
              title="Failed to Load Orders"
              message={error?.message || "Could not retrieve order records."}
              onRetry={() => refetch()}
            />
          )}

          {/* Orders Table */}
          {!isLoading && !isError && filteredOrders.length > 0 && (
            <div className="bg-base-200 border border-base-300 rounded-3xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-xs">
                  <thead>
                    <tr className="text-base-content/70 uppercase font-bold text-[10px] bg-base-300/50">
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Fulfillment Status</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((o) => (
                      <tr key={o.id} className="hover">
                        <td className="font-mono font-bold text-primary">#{o.id}</td>
                        <td>
                          <div className="font-bold text-base-content">{o.user?.name || "Customer"}</div>
                          <div className="text-[10px] text-base-content/50">{o.user?.email || o.userId}</div>
                        </td>
                        <td className="text-base-content/70">{formatDate(o.createdAt)}</td>
                        <td className="font-mono font-black text-base-content">
                          {formatCurrency(o.totalAmount)}
                        </td>
                        <td>
                          {/* Admin Status Dropdown Select */}
                          <select
                            className="select select-bordered select-xs bg-base-100 font-bold rounded-lg"
                            value={o.status}
                            onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                            disabled={updateStatusMutation.isPending}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="PROCESSING">PROCESSING</option>
                            <option value="SHIPPED">SHIPPED</option>
                            <option value="DELIVERED">DELIVERED</option>
                            <option value="CANCELLED">CANCELLED</option>
                          </select>
                        </td>
                        <td className="text-right">
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => setSelectedOrder(o)}
                            leftIcon={<Eye className="w-3.5 h-3.5 text-info" />}
                          >
                            Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Details Modal */}
          <Modal
            isOpen={Boolean(selectedOrder)}
            onClose={() => setSelectedOrder(null)}
            title={`Admin Order Details #${selectedOrder?.id}`}
            description={`Customer User ID: ${selectedOrder?.userId}`}
            footerActions={
              <Button variant="outline" size="sm" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
            }
          >
            {selectedOrder && (
              <div className="space-y-4 my-2 text-xs">
                <div className="flex items-center justify-between p-3 bg-base-100 rounded-2xl border border-base-300">
                  <span className="font-bold text-base-content">Status</span>
                  {getStatusBadge(selectedOrder.status)}
                </div>

                <div className="space-y-2">
                  <div className="font-bold text-base-content/70 uppercase text-[10px] tracking-wider">
                    Itemized Order Breakdown
                  </div>
                  <div className="divide-y divide-base-300 bg-base-100 rounded-2xl border border-base-300 p-3">
                    {selectedOrder.items?.map((item) => (
                      <div key={item.id} className="py-2 first:pt-0 last:pb-0 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-base-content">{item.product?.title || `Product ID: ${item.productId}`}</div>
                          <div className="text-[10px] text-base-content/60 font-mono">
                            Qty: {item.quantity} x {formatCurrency(item.price)}
                          </div>
                        </div>
                        <div className="font-mono font-bold text-primary">
                          {formatCurrency((typeof item.price === "number" ? item.price : parseFloat(item.price as string) || 0) * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-primary/10 text-primary rounded-2xl border border-primary/20 font-black">
                  <span>Grand Total Amount</span>
                  <span className="font-mono text-base">{formatCurrency(selectedOrder.totalAmount)}</span>
                </div>
              </div>
            )}
          </Modal>

        </main>
      </div>
    </RoleGuard>
  );
}
