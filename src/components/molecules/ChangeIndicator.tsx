"use client";

import { memo } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPercentage } from "@/lib/utils";

interface ChangeIndicatorProps {
  value: number;
  showIcon?: boolean;
  className?: string;
}

export const ChangeIndicator = memo(function ChangeIndicator({
  value,
  showIcon = true,
  className,
}: ChangeIndicatorProps) {
  const isPositive = value >= 0;

  return (
    <div
      className={cn(
        "flex items-center gap-1 text-sm font-medium",
        isPositive ? "text-green-500" : "text-red-500",
        className
      )}
    >
      {showIcon &&
        (isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />)}
      <span>{formatPercentage(value)}</span>
    </div>
  );
});
