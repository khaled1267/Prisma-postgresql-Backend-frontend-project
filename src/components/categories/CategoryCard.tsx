"use client";

import Link from "next/link";
import { Category } from "@/types/category";
import { Cpu, Layers, ArrowRight, Sparkles } from "lucide-react";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/gadgets?category=${category.id}`}
      className="group bg-base-200 border border-base-300 hover:border-primary/50 shadow-lg hover:shadow-2xl hover:shadow-primary/10 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-base-100 transition-all duration-300 shadow-md">
            <Cpu className="w-6 h-6" />
          </div>
          
          <span className="badge badge-primary/10 border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
            Category
          </span>
        </div>

        <h3 className="text-xl font-extrabold text-base-content group-hover:text-primary transition line-clamp-1">
          {category.name}
        </h3>

        <p className="text-xs text-base-content/70 mt-2 line-clamp-2 leading-relaxed">
          {category.description ||
            `Explore our curated selection of high-tech ${category.name.toLowerCase()} hardware and smart automation devices.`}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-base-300 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Explore Products
        </span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
