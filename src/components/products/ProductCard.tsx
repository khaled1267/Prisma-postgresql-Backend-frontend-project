"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatters";
import { DEFAULT_PRODUCT_IMAGE } from "@/utils/constants";
import { ShoppingBag, Star, Tag, CheckCircle, AlertTriangle } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const isOutOfStock = product.stock <= 0 || product.status === "OUT_OF_STOCK";
  const imageUrl = product.image && product.image.trim().length > 0 ? product.image : DEFAULT_PRODUCT_IMAGE;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="card bg-base-200 border border-base-300 hover:border-primary/50 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group overflow-hidden flex flex-col justify-between">
      <div>
        {/* Product Image & Badges */}
        <Link href={`/gadgets/${product.id}`} className="relative h-52 w-full bg-base-300 overflow-hidden block">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.category && (
              <span className="badge badge-primary font-semibold text-xs gap-1 shadow-md">
                <Tag className="w-3 h-3" />
                {product.category.name}
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3 z-10">
            {isOutOfStock ? (
              <span className="badge badge-error gap-1 font-bold text-xs shadow-md text-white">
                <AlertTriangle className="w-3 h-3" />
                Out of Stock
              </span>
            ) : (
              <span className="badge badge-success gap-1 font-bold text-xs shadow-md text-base-100">
                <CheckCircle className="w-3 h-3" />
                In Stock ({product.stock})
              </span>
            )}
          </div>
        </Link>

        {/* Product Body */}
        <div className="card-body p-5">
          <Link href={`/gadgets/${product.id}`}>
            <h2 className="card-title text-lg font-bold group-hover:text-primary transition line-clamp-1">
              {product.title}
            </h2>
          </Link>

          <p className="text-xs text-base-content/70 line-clamp-2 h-9 mt-1">
            {product.description || "High-performance smart gadget designed for modern digital workflow and automation."}
          </p>

          {/* Rating preview */}
          <div className="flex items-center gap-1 mt-2 text-warning">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span className="text-xs font-bold text-base-content">4.9</span>
            <span className="text-xs text-base-content/50">(24 reviews)</span>
          </div>
        </div>
      </div>

      {/* Footer Price & Add to Cart */}
      <div className="p-5 pt-0">
        <div className="flex justify-between items-center pt-3 border-t border-base-300">
          <div className="flex flex-col">
            <span className="text-[10px] text-base-content/50 uppercase font-semibold">Price</span>
            <span className="text-xl font-extrabold text-primary">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`btn btn-sm rounded-xl gap-1 shadow-lg transition ${
                added ? "btn-success text-white" : "btn-primary shadow-primary/20 hover:scale-105"
              }`}
              title="Add to Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              {added ? "Added!" : "Add to Cart"}
            </button>

            <Link href={`/gadgets/${product.id}`}>
              <button className="btn btn-outline btn-sm rounded-xl text-xs">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
