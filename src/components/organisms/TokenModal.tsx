"use client";

import { memo } from "react";
import { X, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { Token } from "@/types/token";
import {
  formatPrice,
  formatNumber,
  formatPercentage,
  truncateAddress,
} from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/Button";

interface TokenModalProps {
  token: Token | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TokenModal = memo(function TokenModal({
  token,
  isOpen,
  onClose,
}: TokenModalProps) {
  if (!isOpen || !token) return null;

  const isPositive = token.priceChange24h >= 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-xl max-w-2xl w-full p-6 border border-border shadow-2xl animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-2xl font-bold">
              {token.symbol[0]}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {token.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-muted-foreground">{token.symbol}</span>
                <span className="text-xs text-muted-foreground">
                  {truncateAddress(token.address)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-muted"
          >
            <X size={24} />
          </button>
        </div>

        {/* Price Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-muted-foreground text-sm mb-1">
              Current Price
            </div>
            <div className="text-foreground text-2xl font-mono font-bold">
              {formatPrice(token.price)}
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-muted-foreground text-sm mb-1">24h Change</div>
            <div
              className={cn(
                "text-2xl font-bold flex items-center gap-2",
                isPositive ? "text-green-500" : "text-red-500"
              )}
            >
              {isPositive ? (
                <TrendingUp size={24} />
              ) : (
                <TrendingDown size={24} />
              )}
              {formatPercentage(token.priceChange24h)}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-muted-foreground text-sm mb-1">Volume 24h</div>
            <div className="text-foreground text-lg font-semibold">
              {formatNumber(token.volume24h)}
            </div>
            <div
              className={cn(
                "text-xs mt-1",
                token.volumeChange24h >= 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {formatPercentage(token.volumeChange24h)}
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-muted-foreground text-sm mb-1">Market Cap</div>
            <div className="text-foreground text-lg font-semibold">
              {formatNumber(token.marketCap)}
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-muted-foreground text-sm mb-1">Liquidity</div>
            <div className="text-foreground text-lg font-semibold">
              {formatNumber(token.liquidity)}
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="text-muted-foreground text-sm mb-1">Holders</div>
            <div className="text-foreground text-lg font-semibold">
              {token.holders.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button className="flex-1" size="lg">
            Trade Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              window.open(
                `https://etherscan.io/address/${token.address}`,
                "_blank"
              )
            }
          >
            <ExternalLink size={18} />
            View on Explorer
          </Button>
        </div>
      </div>
    </div>
  );
});
