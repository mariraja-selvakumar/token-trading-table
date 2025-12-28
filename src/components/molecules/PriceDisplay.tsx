"use client";

import { memo, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  previousPrice?: number;
  className?: string;
}

export const PriceDisplay = memo(function PriceDisplay({
  price,
  previousPrice,
  className,
}: PriceDisplayProps) {
  const [flashColor, setFlashColor] = useState<string>("");

  useEffect(() => {
    if (previousPrice && previousPrice !== price) {
      const color = price > previousPrice ? "text-green-500" : "text-red-500";

      const timeoutId = setTimeout(() => {
        setFlashColor(color);
        const resetTimer = setTimeout(() => setFlashColor(""), 500);
        return () => clearTimeout(resetTimer);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [price, previousPrice]);

  return (
    <span
      className={cn(
        "font-mono text-sm transition-colors duration-300",
        flashColor || "text-foreground",
        className
      )}
    >
      {formatPrice(price)}
    </span>
  );
});
