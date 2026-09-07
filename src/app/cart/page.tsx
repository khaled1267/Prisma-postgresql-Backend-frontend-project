"use client";

import Image from "next/image";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PageContainer from "@/components/ui/PageContainer";
import Button from "@/components/ui/Button";
import LoadingComponent from "@/components/common/LoadingComponent";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/formatters";
import { DEFAULT_PRODUCT_IMAGE } from "@/utils/constants";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
} from "lucide-react";

export default function CartPage() {
  const {
    cartItems,
    cartCount,
    subtotal,
    shipping,
    tax,
    total,
    isLoading,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <ProtectedRoute>
      <PageContainer maxWidth="7xl" className="py-8">
        
        {/* Cart Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary mb-1">
              <ShoppingCart className="w-4 h-4" />
              <span>Shopping Cart</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-base-content tracking-tight">
              Your Hardware <span className="gradient-title">Cart</span>
            </h1>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-error font-bold hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-4 h-4" /> Empty Entire Cart
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && <LoadingComponent message="Synchronizing cart items..." />}

        {/* Empty Cart State */}
        {!isLoading && cartItems.length === 0 && (
          <div className="bg-base-200 border border-base-300 rounded-3xl p-12 text-center max-w-lg mx-auto my-8 shadow-xl space-y-4">
            <div className="p-4 rounded-full bg-primary/10 text-primary w-20 h-20 mx-auto flex items-center justify-center border border-primary/20">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-base-content">Your Cart is Empty</h2>
            <p className="text-xs text-base-content/60 max-w-xs mx-auto">
              Looks like you haven't added any AI gadgets or smart hardware to your cart yet.
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

        {/* Active Cart Layout: Table & Order Summary */}
        {!isLoading && cartItems.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Columns: Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-base-200 border border-base-300 rounded-3xl shadow-xl overflow-hidden p-6 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-base-content/60 border-b border-base-300 pb-3">
                  Cart Items ({cartCount} {cartCount === 1 ? "unit" : "units"})
                </div>

                <div className="divide-y divide-base-300">
                  {cartItems.map((item) => {
                    const img =
                      item.product.image && item.product.image.trim().length > 0
                        ? item.product.image
                        : DEFAULT_PRODUCT_IMAGE;

                    const unitPrice =
                      typeof item.product.price === "number"
                        ? item.product.price
                        : parseFloat(item.product.price as string) || 0;

                    const itemSubtotal = unitPrice * item.quantity;

                    return (
                      <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        
                        {/* Image & Product Title */}
                        <div className="flex items-center gap-4 flex-1">
                          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-base-300 shrink-0 border border-base-300">
                            <Image src={img} alt={item.product.title} fill className="object-cover" unoptimized />
                          </div>
                          <div className="space-y-1">
                            <Link href={`/gadgets/${item.product.id}`}>
                              <h3 className="font-bold text-sm text-base-content hover:text-primary transition line-clamp-1">
                                {item.product.title}
                              </h3>
                            </Link>
                            {item.product.category && (
                              <span className="badge badge-primary/10 border-primary/20 text-primary font-bold text-[9px]">
                                {item.product.category.name}
                              </span>
                            )}
                            <div className="text-xs font-mono text-primary font-bold">
                              {formatCurrency(unitPrice)} <span className="text-[10px] text-base-content/50 font-normal">/ unit</span>
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls & Subtotal */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-base-300">
                          
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-base-300 rounded-xl bg-base-100 p-1">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="btn btn-ghost btn-square btn-xs text-base-content/70 hover:bg-base-200"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>

                            <span className="w-8 text-center font-bold text-xs font-mono">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="btn btn-ghost btn-square btn-xs text-base-content/70 hover:bg-base-200"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Item Subtotal */}
                          <div className="font-black text-sm text-base-content font-mono min-w-[70px] text-right">
                            {formatCurrency(itemSubtotal)}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="btn btn-ghost btn-square btn-xs text-error hover:bg-error/10"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guarantees Footer Banner */}
              <div className="grid grid-cols-3 gap-3 text-[11px] text-base-content/70">
                <div className="p-3 bg-base-200 rounded-2xl border border-base-300 text-center flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-bold">Encrypted Checkout</span>
                </div>
                <div className="p-3 bg-base-200 rounded-2xl border border-base-300 text-center flex items-center justify-center gap-2">
                  <Truck className="w-4 h-4 text-info shrink-0" />
                  <span className="font-bold">Fast Hardware Delivery</span>
                </div>
                <div className="p-3 bg-base-200 rounded-2xl border border-base-300 text-center flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4 text-accent shrink-0" />
                  <span className="font-bold">30-Day Money Back</span>
                </div>
              </div>
            </div>

            {/* Right 1 Column: Order Summary Sidebar */}
            <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-xl h-fit space-y-5">
              <h2 className="font-black text-lg text-base-content border-b border-base-300 pb-3">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs">
                
                {/* Subtotal */}
                <div className="flex justify-between items-center text-base-content/70">
                  <span>Cart Subtotal</span>
                  <span className="font-mono font-bold text-base-content">{formatCurrency(subtotal)}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between items-center text-base-content/70">
                  <span>Express Shipping</span>
                  <span className="font-mono font-bold text-base-content">
                    {shipping === 0 ? (
                      <span className="text-success font-extrabold">FREE</span>
                    ) : (
                      formatCurrency(shipping)
                    )}
                  </span>
                </div>

                {/* Shipping free progress note */}
                {subtotal < 150 && (
                  <div className="text-[10px] text-info bg-info/10 p-2 rounded-xl border border-info/20">
                    Add <span className="font-bold">{formatCurrency(150 - subtotal)}</span> more for FREE Express Shipping!
                  </div>
                )}

                {/* Estimated Tax */}
                <div className="flex justify-between items-center text-base-content/70">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-mono font-bold text-base-content">{formatCurrency(tax)}</span>
                </div>

                {/* Total */}
                <div className="pt-3 border-t border-base-300 flex justify-between items-center text-sm font-black">
                  <span className="text-base-content">Order Total</span>
                  <span className="text-primary font-mono text-xl">{formatCurrency(total)}</span>
                </div>

              </div>

              {/* Checkout Button */}
              <div className="pt-2">
                <Link href="/orders">
                  <Button
                    variant="primary"
                    size="lg"
                    isFullWidth
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>

              <div className="text-center">
                <Link href="/gadgets" className="text-xs text-primary font-bold hover:underline">
                  ← Continue Shopping
                </Link>
              </div>

            </div>

          </div>
        )}

      </PageContainer>
    </ProtectedRoute>
  );
}
