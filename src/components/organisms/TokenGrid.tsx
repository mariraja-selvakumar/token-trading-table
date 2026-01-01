"use client";

import { memo, useState } from "react";
import { Token } from "@/types/token";
import { TokenCard } from "./TokenCard";
import { TokenModal } from "./TokenModal";
import { Skeleton } from "@/components/atoms/Skeleton";

interface TokenGridProps {
  tokens: Token[];
  loading?: boolean;
}

const SkeletonCard = memo(function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-xl p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-16 h-3" />
          </div>
        </div>
        <div className="text-right">
          <Skeleton className="w-16 h-3 mb-1" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <Skeleton className="w-full h-3 mb-1" />
            <Skeleton className="w-full h-4" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-2 mb-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="text-center">
            <Skeleton className="w-full h-3 mb-1" />
            <Skeleton className="w-full h-3" />
          </div>
        ))}
      </div>

      <Skeleton className="w-full h-8 rounded-lg mb-2" />
      <Skeleton className="w-full h-3" />
    </div>
  );
});

export const TokenGrid = memo(function TokenGrid({
  tokens,
  loading = false,
}: TokenGridProps) {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : tokens.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No tokens found
          </div>
        ) : (
          tokens.map((token) => (
            <TokenCard
              key={token.id}
              token={token}
              onClick={setSelectedToken}
            />
          ))
        )}
      </div>

      <TokenModal
        token={selectedToken}
        isOpen={!!selectedToken}
        onClose={() => setSelectedToken(null)}
      />
    </>
  );
});
