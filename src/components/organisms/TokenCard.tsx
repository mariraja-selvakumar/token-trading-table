"use client";

import { memo } from "react";
import { Token } from "@/types/token";
import { formatPrice, formatNumber, cn } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Globe,
  MessageSquare,
  Users,
  Flame,
} from "lucide-react";

interface TokenCardProps {
  token: Token;
  onClick: (token: Token) => void;
}

export const TokenCard = memo(function TokenCard({
  token,
  onClick,
}: TokenCardProps) {
  const isPositive = token.priceChange24h >= 0;

  return (
    <div
      onClick={() => onClick(token)}
      className={cn(
        "relative bg-card border border-border rounded-xl p-4 cursor-pointer",
        "transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        "group"
      )}
    >
      {/* Header - Token Info */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-lg font-bold shadow-lg">
              {token.logo ? (
                <img
                  src={token.logo}
                  alt={token.name}
                  className="w-full h-full rounded-xl"
                />
              ) : (
                token.symbol[0]
              )}
            </div>
            {/* Flame icon for hot tokens */}
            {token.priceChange24h > 50 && (
              <div className="absolute -top-1 -right-1 bg-orange-500 rounded-full p-1">
                <Flame size={10} className="text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              {token.name}
              <span className="text-muted-foreground text-xs">
                {token.symbol}
              </span>
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-muted-foreground">8s</span>
              <div className="flex items-center gap-1">
                <Globe size={10} className="text-muted-foreground" />
                <MessageSquare size={10} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>

        {/* Market Cap */}
        <div className="text-right">
          <div className="text-xs text-muted-foreground">MC</div>
          <div className="text-sm font-semibold text-primary">
            {formatNumber(token.marketCap)}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Price</div>
          <div className="text-xs font-mono font-semibold text-foreground">
            {formatPrice(token.price)}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Volume</div>
          <div className="text-xs font-semibold text-foreground">
            {formatNumber(token.volume24h)}
          </div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">
            <Users size={10} className="inline" /> Holders
          </div>
          <div className="text-xs font-semibold text-foreground">
            {token.holders > 1000
              ? `${(token.holders / 1000).toFixed(1)}k`
              : token.holders}
          </div>
        </div>
      </div>

      {/* Price Change Indicators */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="text-center">
          <div
            className={cn(
              "text-xs font-semibold",
              isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {isPositive ? (
              <TrendingUp size={10} className="inline" />
            ) : (
              <TrendingDown size={10} className="inline" />
            )}
            {Math.abs(token.priceChange24h).toFixed(0)}%
          </div>
          <div className="text-xs text-muted-foreground">9h</div>
        </div>
        <div className="text-center">
          <div
            className={cn(
              "text-xs font-semibold",
              isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {isPositive ? "+" : ""}
            {token.priceChange24h.toFixed(0)}%
          </div>
          <div className="text-xs text-muted-foreground">1m</div>
        </div>
        <div className="text-center">
          <div
            className={cn(
              "text-xs font-semibold",
              isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {Math.abs(token.priceChange24h / 2).toFixed(0)}%
          </div>
          <div className="text-xs text-muted-foreground">3d</div>
        </div>
        <div className="text-center">
          <div
            className={cn(
              "text-xs font-semibold",
              isPositive ? "text-green-500" : "text-red-500"
            )}
          >
            {Math.abs(token.priceChange24h * 0.8).toFixed(0)}%
          </div>
          <div className="text-xs text-muted-foreground">6%</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-2 mb-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">Liquidity</span>
            <span className="text-foreground font-medium">
              {formatNumber(token.liquidity)}
            </span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{
                width: `${Math.min(
                  (token.liquidity / token.marketCap) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-primary hover:bg-primary/90 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        <span className="text-xs">⚡</span>0 SOL
      </button>

      {/* Address */}
      <div className="mt-2 text-xs text-muted-foreground text-center truncate">
        {token.address.slice(0, 6)}...{token.address.slice(-4)}
      </div>
    </div>
  );
});
