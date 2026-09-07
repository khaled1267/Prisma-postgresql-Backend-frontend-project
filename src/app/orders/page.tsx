"use client";

import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PageContainer from "@/components/ui/PageContainer";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import LoadingComponent from "@/components/common/LoadingComponent";
import ErrorComponent from "@/components/common/ErrorComponent";
import { useMyOrders } from "@/hooks/useOrders";
import { useCreateOrderMutation } from "@/hooks/useOrderMutations";
import { useCart } from "@/context/CartContext";
import { Order, OrderStatus } from "@/types/order";
import { formatCurrency, formatDate } from "@/utils/formatters";
import {
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  AlertCircle,
  Eye,
  ArrowLeft,
  XCircle,
  CreditCard,
} from "lucide-react";

export default function CustomerOrdersPage() {
  const { data: orders, isLoading, isError, error, refetch } = useMyOrders();
  const { cartItems, total: cartTotal, clearCart } = useCart();
  const createOrderMutation = useCreateOrderMutation();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);

  // Helper for Order Status Badge
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

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    const payload = {
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price:
          typeof item.product.price === "number"
            ? item.product.price
            : parseFloat(item.product.price as string) || 0,
      })),
      totalAmount: cartTotal,
    };

    createOrderMutation.mutate(payload, {
      onSuccess: (newOrder) => {
        clearCart();
        setIsCheckoutModalOpen(false);
        setCheckoutSuccess(`Order #${newOrder.id} successfully placed! Track status below.`);
        refetch();
        setTimeout(() => setCheckoutSuccess(null), 5000);
      },
      onError: (err) => {
        alert(err.response?.data?.message || err.message || "Failed to place order.");
      },
    });
  };

  return (
    <ProtectedRoute>
      <PageContainer maxWidth="7xl" className="py-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
              <Package className="w-4 h-4" />
              <span>Order History</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
              My Gadget <span className="gradient-title">Orders</span>
            </h1>
          </div>

          {cartItems.length > 0 && (
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsCheckoutModalOpen(true)}
              leftIcon={<CreditCard className="w-4 h-4" />}
            >
              Checkout Cart ({cartItems.length} items)
            </Button>
          )}
        </div>

        {/* Success Toast */}
        {checkoutSuccess && (
          <div className="alert alert-success shadow-lg rounded-2xl text-xs font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{checkoutSuccess}</span>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingComponent message="Loading customer order history..." />}

        {/* Error State */}
        {isError && (
          <ErrorComponent
            title="Failed to Load Orders"
            message={error?.message || "Could not retrieve order records."}
            onRetry={() => refetch()}
          />
        )}

        {/* Empty Orders State */}
        {!isLoading && !isError && (!orders || orders.length === 0) && (
          <div className="bg-base-200 border border-base-300 rounded-3xl p-12 text-center max-w-lg mx-auto my-8 shadow-xl space-y-4">
            <div className="p-4 rounded-full bg-primary/10 text-primary w-20 h-20 mx-auto flex items-center justify-center border border-primary/20">
              <Package className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-base-content">No Orders Placed Yet</h2>
            <p className="text-xs text-base-content/60 max-w-xs mx-auto">
              You haven't placed any hardware order yet. Explore our marketplace to discover smart AI gadgets!
            </p>
            <div className="pt-2">
              <Link href="/gadgets">
                <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Explore Gadgets Catalog
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Orders Table & Cards */}
        {!isLoading && !isError && orders && orders.length > 0 && (
          <div className="space-y-4">
            
            {/* Desktop Table View */}
            <div className="hidden md:block bg-base-200 border border-base-300 rounded-3xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-xs">
                  <thead>
                    <tr className="text-base-content/70 uppercase font-bold text-[10px] bg-base-300/50">
                      <th>Order Reference</th>
                      <th>Placed Date</th>
                      <th>Status</th>
                      <th>Total Amount</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr key={o.id} className="hover">
                        <td className="font-mono font-bold text-primary">#{o.id}</td>
                        <td className="text-base-content/70">{formatDate(o.createdAt)}</td>
                        <td>{getStatusBadge(o.status)}</td>
                        <td className="font-mono font-black text-base-content text-sm">
                          {formatCurrency(o.totalAmount)}
                        </td>
                        <td className="text-right">
                          <Button
                            variant="ghost"
                            size="xs"
                            onClick={() => setSelectedOrder(o)}
                            leftIcon={<Eye className="w-3.5 h-3.5 text-info" />}
                          >
                            View Order
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="bg-base-200 border border-base-300 rounded-2xl p-5 shadow-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-mono font-bold text-primary text-sm">#{o.id}</div>
                      <div className="text-[10px] text-base-content/60">{formatDate(o.createdAt)}</div>
                    </div>
                    {getStatusBadge(o.status)}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-base-300">
                    <div className="text-sm font-black text-base-content font-mono">
                      {formatCurrency(o.totalAmount)}
                    </div>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => setSelectedOrder(o)}
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Order Details Modal */}
        <Modal
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
          title={`Order Details #${selectedOrder?.id}`}
          description={`Placed on ${selectedOrder ? formatDate(selectedOrder.createdAt) : ""}`}
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
                  Purchased Items
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
                <span>Total Amount Paid</span>
                <span className="font-mono text-base">{formatCurrency(selectedOrder.totalAmount)}</span>
              </div>
            </div>
          )}
        </Modal>

        {/* Checkout Modal */}
        <Modal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          title="Confirm Hardware Checkout"
          description="Place your order using stored cart items."
          footerActions={
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCheckoutModalOpen(false)}
                disabled={createOrderMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handlePlaceOrder}
                isLoading={createOrderMutation.isPending}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Confirm & Place Order ({formatCurrency(cartTotal)})
              </Button>
            </>
          }
        >
          <div className="space-y-3 my-2 text-xs">
            <div className="font-bold text-base-content">Items in Order ({cartItems.length}):</div>
            <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-base-100 rounded-xl border border-base-300">
                  <span className="font-semibold text-base-content truncate max-w-[200px]">{item.product.title}</span>
                  <span className="font-mono text-primary font-bold">{item.quantity} x {formatCurrency(item.product.price)}</span>
                </div>
              ))}
            </div>
          </div>
        </Modal>

      </PageContainer>
    </ProtectedRoute>
  );
}
