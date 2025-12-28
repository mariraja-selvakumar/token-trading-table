"use client";

import { memo, useState } from "react";
import { ExternalLink, Copy, Check } from "lucide-react";
import { Token } from "@/types/token";
import { TokenIcon } from "@/components/molecules/TokenIcon";
import { PriceDisplay } from "@/components/molecules/PriceDisplay";
import { ChangeIndicator } from "@/components/molecules/ChangeIndicator";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface TokenRowProps {
  token: Token;
  previousPrice?: number;
  onRowClick: (token: Token) => void;
}

export const TokenRow = memo(function TokenRow({
  token,
  previousPrice,
  onRowClick,
}: TokenRowProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://etherscan.io/address/${token.address}`, "_blank");
  };

  return (
    <tr
      className={cn(
        "border-b border-border transition-colors cursor-pointer",
        "hover:bg-muted/50"
      )}
      onClick={() => onRowClick(token)}
    >
      {/* Token Info */}
      <td className="px-4 py-3 sticky left-0 bg-background">
        <TokenIcon symbol={token.symbol} name={token.name} logo={token.logo} />
      </td>

      {/* Price */}
      <td className="px-4 py-3 text-right">
        <PriceDisplay price={token.price} previousPrice={previousPrice} />
      </td>

      {/* 24h Change */}
      <td className="px-4 py-3">
        <ChangeIndicator value={token.priceChange24h} />
      </td>

      {/* Volume 24h */}
      <td className="px-4 py-3 text-right">
        <div className="flex flex-col items-end">
          <span className="text-sm text-foreground">
            {formatNumber(token.volume24h)}
          </span>
          <span
            className={cn(
              "text-xs",
              token.volumeChange24h >= 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {token.volumeChange24h >= 0 ? "+" : ""}
            {token.volumeChange24h.toFixed(1)}%
          </span>
        </div>
      </td>

      {/* Market Cap */}
      <td className="px-4 py-3 text-right text-sm text-foreground">
        {formatNumber(token.marketCap)}
      </td>

      {/* Liquidity */}
      <td className="px-4 py-3 text-right text-sm text-foreground">
        {formatNumber(token.liquidity)}
      </td>

      {/* Holders */}
      <td className="px-4 py-3 text-right text-sm text-foreground">
        {token.holders.toLocaleString()}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2 justify-end">
          <button
            onClick={handleCopyAddress}
            className={cn(
              "p-1.5 rounded hover:bg-muted transition-colors",
              "group relative"
            )}
            title="Copy address"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy
                size={16}
                className="text-muted-foreground group-hover:text-foreground"
              />
            )}
          </button>
          <button
            onClick={handleExternalLink}
            className="p-1.5 rounded hover:bg-muted transition-colors group"
            title="View on Etherscan"
          >
            <ExternalLink
              size={16}
              className="text-muted-foreground group-hover:text-foreground"
            />
          </button>
        </div>
      </td>
    </tr>
  );
});
