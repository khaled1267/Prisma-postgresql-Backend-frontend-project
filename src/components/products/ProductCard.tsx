"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatCurrency } from "@/utils/formatters";
import { DEFAULT_PRODUCT_IMAGE } from "@/utils/constants";
import { ShoppingBag, Tag, CheckCircle, AlertTriangle, ArrowUpRight } from "lucide-react";

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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-base-300/80 bg-base-200/85 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10">
      <div className="flex flex-1 flex-col">
        {/* Product Image & Badges */}
        <Link
          href={`/gadgets/${product.id}`}
          aria-label={`View ${product.title}`}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-base-300 via-base-200 to-base-300"
        >
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            unoptimized
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-base-100/35 via-transparent to-black/15" />
          <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
            {product.category && (
              <span className="badge badge-primary/90 border-0 font-semibold text-[10px] gap-1 shadow-md backdrop-blur">
                <Tag className="w-3 h-3" />
                {product.category.name}
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3 z-10">
            {isOutOfStock ? (
              <span className="badge badge-error gap-1 font-bold text-[10px] shadow-md text-white">
                <AlertTriangle className="w-3 h-3" />
                Out of Stock
              </span>
            ) : (
              <span className="badge badge-success gap-1 font-bold text-[10px] shadow-md text-base-100">
                <CheckCircle className="w-3 h-3" />
                {product.stock <= 5 ? `Only ${product.stock} left` : "In Stock"}
              </span>
            )}
          </div>
        </Link>

        {/* Product Body */}
        <div className="flex flex-1 flex-col p-5">
          <Link href={`/gadgets/${product.id}`}>
            <h2 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-base-content transition-colors group-hover:text-primary sm:text-lg">
              {product.title}
            </h2>
          </Link>

          {product.description && (
            <p className="mt-2 line-clamp-2 min-h-9 text-xs leading-relaxed text-base-content/65">
              {product.description}
            </p>
          )}
        </div>
      </div>

      {/* Footer Price & Add to Cart */}
      <div className="px-5 pb-5">
        <div className="flex flex-col gap-4 border-t border-base-300/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-base-content/50">Price</span>
            <span className="text-xl font-extrabold tabular-nums text-primary">
              {formatCurrency(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              aria-label={`${added ? "Added" : "Add"} ${product.title} to cart`}
              className={`btn btn-sm flex-1 rounded-xl shadow-primary/20 transition sm:flex-none ${
                added ? "btn-success text-white" : "btn-primary shadow-lg hover:shadow-primary/30"
              }`}
              title="Add to Shopping Cart"
            >
              {added ? <CheckCircle className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
              {added ? "Added!" : "Add to Cart"}
            </button>

            <Link
              href={`/gadgets/${product.id}`}
              className="btn btn-ghost btn-square btn-sm rounded-xl"
              aria-label={`View details for ${product.title}`}
            >
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
