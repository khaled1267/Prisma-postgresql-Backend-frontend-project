"use client";

export function ProductSkeletonCard() {
  return (
    <div className="card bg-base-200 border border-base-300 rounded-3xl p-4 shadow-xl space-y-4 animate-pulse">
      <div className="h-48 bg-base-300 rounded-2xl w-full" />
      <div className="space-y-2">
        <div className="h-4 bg-base-300 rounded-lg w-3/4" />
        <div className="h-3 bg-base-300 rounded-lg w-1/2" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="h-6 bg-base-300 rounded-lg w-1/3" />
        <div className="h-8 bg-base-300 rounded-xl w-1/4" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeletonCard key={i} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 bg-base-200 border border-base-300 rounded-2xl w-full" />
      ))}
    </div>
  );
}

export function CategorySkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-28 bg-base-200 border border-base-300 rounded-2xl animate-pulse p-4 space-y-2">
          <div className="h-4 bg-base-300 rounded-md w-1/2" />
          <div className="h-3 bg-base-300 rounded-md w-3/4" />
        </div>
      ))}
    </div>
  );
}
