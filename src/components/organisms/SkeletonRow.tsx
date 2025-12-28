"use client";

import { memo } from "react";
import { Skeleton } from "@/components/atoms/Skeleton";

export const SkeletonRow = memo(function SkeletonRow() {
  return (
    <tr className="border-b border-border">
      {/* Token Info */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="w-20 h-4" />
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-3">
        <Skeleton className="w-24 h-4 ml-auto" />
      </td>

      {/* 24h Change */}
      <td className="px-4 py-3">
        <Skeleton className="w-16 h-4" />
      </td>

      {/* Volume */}
      <td className="px-4 py-3">
        <Skeleton className="w-20 h-4 ml-auto" />
      </td>

      {/* Market Cap */}
      <td className="px-4 py-3">
        <Skeleton className="w-20 h-4 ml-auto" />
      </td>

      {/* Liquidity */}
      <td className="px-4 py-3">
        <Skeleton className="w-20 h-4 ml-auto" />
      </td>

      {/* Holders */}
      <td className="px-4 py-3">
        <Skeleton className="w-16 h-4 ml-auto" />
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex gap-2 justify-end">
          <Skeleton className="w-6 h-6 rounded" />
          <Skeleton className="w-6 h-6 rounded" />
        </div>
      </td>
    </tr>
  );
});
