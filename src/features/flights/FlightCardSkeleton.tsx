import React from "react";

export function FlightCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Airline Skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 animate-shimmer rounded-lg" />
          <div className="space-y-2">
            <div className="h-5 w-24 animate-shimmer rounded" />
            <div className="h-4 w-16 animate-shimmer rounded" />
          </div>
        </div>

        {/* Route & Time Skeleton */}
        <div className="flex flex-1 items-center gap-4">
          {/* Departure */}
          <div className="text-center space-y-2">
            <div className="h-8 w-20 animate-shimmer rounded mx-auto" />
            <div className="h-4 w-12 animate-shimmer rounded mx-auto" />
            <div className="h-3 w-16 animate-shimmer rounded mx-auto" />
          </div>

          {/* Duration & Stops */}
          <div className="flex flex-1 flex-col items-center gap-2">
            <div className="h-4 w-16 animate-shimmer rounded" />
            <div className="relative w-full">
              <div className="h-0.5 w-full bg-gray-200"></div>
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-shimmer rounded-full" />
            </div>
            <div className="h-3 w-20 animate-shimmer rounded" />
          </div>

          {/* Arrival */}
          <div className="text-center space-y-2">
            <div className="h-8 w-20 animate-shimmer rounded mx-auto" />
            <div className="h-4 w-12 animate-shimmer rounded mx-auto" />
            <div className="h-3 w-16 animate-shimmer rounded mx-auto" />
          </div>
        </div>

        {/* Price & Action Skeleton */}
        <div className="flex items-center gap-4 lg:flex-col lg:items-end">
          <div className="flex-1 lg:flex-none space-y-2">
            <div className="h-8 w-24 animate-shimmer rounded ml-auto" />
            <div className="h-4 w-20 animate-shimmer rounded ml-auto" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-24 animate-shimmer rounded-lg" />
            <div className="h-10 w-28 animate-shimmer rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlightCardSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <FlightCardSkeleton key={index} />
      ))}
    </div>
  );
}
