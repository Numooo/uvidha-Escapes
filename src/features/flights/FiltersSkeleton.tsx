import React from "react";

export function FiltersSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="h-6 w-20 animate-shimmer rounded" />
        <div className="h-5 w-16 animate-shimmer rounded" />
      </div>

      <div className="space-y-6">
        {/* Price Range Section */}
        <div>
          <div className="mb-3 h-5 w-24 animate-shimmer rounded" />
          <div className="space-y-3">
            <div className="h-2 w-full animate-shimmer rounded-full" />
            <div className="flex justify-between">
              <div className="h-4 w-16 animate-shimmer rounded" />
              <div className="h-4 w-16 animate-shimmer rounded" />
            </div>
          </div>
        </div>

        {/* Stops Section */}
        <div>
          <div className="mb-3 h-5 w-16 animate-shimmer rounded" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 animate-shimmer rounded" />
                <div className="h-4 w-20 animate-shimmer rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Airlines Section */}
        <div>
          <div className="mb-3 h-5 w-20 animate-shimmer rounded" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 animate-shimmer rounded" />
                <div className="h-4 w-24 animate-shimmer rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Time Slots Section */}
        <div>
          <div className="mb-3 h-5 w-32 animate-shimmer rounded" />
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 animate-shimmer rounded-lg" />
            ))}
          </div>
        </div>

        {/* Duration Section */}
        <div>
          <div className="mb-3 h-5 w-28 animate-shimmer rounded" />
          <div className="space-y-3">
            <div className="h-2 w-full animate-shimmer rounded-full" />
            <div className="h-4 w-20 animate-shimmer rounded mx-auto" />
          </div>
        </div>

        {/* Cabin Class Section */}
        <div>
          <div className="mb-3 h-5 w-24 animate-shimmer rounded" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-4 w-4 animate-shimmer rounded" />
                <div className="h-4 w-32 animate-shimmer rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
