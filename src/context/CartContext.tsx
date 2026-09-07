"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types/product";
import { CartItem } from "@/types/cart";
import { cartService } from "@/services/cart.service";

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate cart on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const items = await cartService.getCart();
        setCartItems(items);
      } catch {
        const local = localStorage.getItem("gadgetai_cart");
        if (local) {
          try {
            setCartItems(JSON.parse(local));
          } catch {
            setCartItems([]);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Save changes to persistent storage
  const syncStorage = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("gadgetai_cart", JSON.stringify(items));
  };

  const addToCart = async (product: Product, quantityToAdd: number = 1) => {
    try {
      await cartService.addItem({ productId: product.id, quantity: quantityToAdd });
    } catch {
      // Offline / Fallback local update
    }

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.productId === product.id);
      let updated: CartItem[];

      if (existingIndex > -1) {
        updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantityToAdd,
          product,
        };
      } else {
        const newItem: CartItem = {
          id: `cart-${product.id}-${Date.now()}`,
          productId: product.id,
          quantity: quantityToAdd,
          product,
        };
        updated = [...prevItems, newItem];
      }

      syncStorage(updated);
      return updated;
    });
  };

  const removeFromCart = async (productId: string) => {
    const itemToRemove = cartItems.find((i) => i.productId === productId || i.id === productId);
    if (itemToRemove?.id) {
      try {
        await cartService.removeItem(itemToRemove.id);
      } catch {
        // Fallback
      }
    }

    setCartItems((prevItems) => {
      const updated = prevItems.filter(
        (item) => item.productId !== productId && item.id !== productId
      );
      syncStorage(updated);
      return updated;
    });
  };

  const updateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const itemToUpdate = cartItems.find((i) => i.productId === productId || i.id === productId);
    if (itemToUpdate?.id) {
      try {
        await cartService.updateItem(itemToUpdate.id, { quantity: newQuantity });
      } catch {
        // Fallback
      }
    }

    setCartItems((prevItems) => {
      const updated = prevItems.map((item) => {
        if (item.productId === productId || item.id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      syncStorage(updated);
      return updated;
    });
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
    } catch {
      // Fallback
    }
    syncStorage([]);
  };

  // Calculations
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce((sum, item) => {
    const price =
      typeof item.product.price === "number"
        ? item.product.price
        : parseFloat(item.product.price as string) || 0;
    return sum + price * item.quantity;
  }, 0);

  const shipping = subtotal > 0 ? (subtotal >= 150 ? 0 : 15) : 0;
  const tax = subtotal * 0.05; // 5% tax estimate
  const total = subtotal + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        tax,
        shipping,
        total,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
