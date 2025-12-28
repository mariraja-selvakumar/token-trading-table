"use client";

import { memo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface TokenIconProps {
  symbol: string;
  name: string;
  logo?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-6 h-6 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-12 h-12 text-base",
};

export const TokenIcon = memo(function TokenIcon({
  symbol,
  name,
  logo,
  size = "md",
  className,
}: TokenIconProps) {
  const firstLetter = symbol.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          "flex items-center justify-center rounded-full font-bold",
          "bg-gradient-to-br from-purple-500 to-pink-500",
          sizeClasses[size],
          className
        )}
      >
        {logo ? (
          <Image
            src={logo}
            alt={name}
            className="w-full h-full rounded-full"
            fill
            sizes="(max-width: 768px) 24px, (max-width: 1024px) 32px, 48px"
          />
        ) : (
          firstLetter
        )}
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-foreground text-sm">{name}</span>
        <span className="text-xs text-muted-foreground">{symbol}</span>
      </div>
    </div>
  );
});
