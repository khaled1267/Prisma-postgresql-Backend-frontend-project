"use client";

import { Category } from "@/types/category";
import { Sparkles, Layers } from "lucide-react";

interface CategoryListProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (id: string | null) => void;
}

export default function CategoryList({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryListProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {/* "All Gadgets" Pill */}
      <button
        onClick={() => onSelectCategory(null)}
        className={`btn btn-sm rounded-full gap-2 transition-all ${
          selectedCategoryId === null
            ? "btn-primary shadow-lg shadow-primary/25"
            : "btn-outline border-base-300 text-base-content/80 hover:bg-base-200"
        }`}
      >
        <Layers className="w-4 h-4" />
        All Categories
      </button>

      {/* Category Pills */}
      {categories.map((cat) => {
        const isSelected = selectedCategoryId === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`btn btn-sm rounded-full gap-2 transition-all whitespace-nowrap ${
              isSelected
                ? "btn-primary shadow-lg shadow-primary/25"
                : "btn-outline border-base-300 text-base-content/80 hover:bg-base-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
