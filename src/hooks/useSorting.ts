"use client";

import { useMemo } from "react";
import { Token, SortConfig } from "@/types/token";

/**
 * Custom hook for sorting tokens
 * Memoized for performance
 */
export function useSorting(tokens: Token[], sortConfig: SortConfig) {
  const sortedTokens = useMemo(() => {
    if (!tokens || tokens.length === 0) return [];

    const sorted = [...tokens].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle string comparison
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Handle number comparison
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });

    return sorted;
  }, [tokens, sortConfig]);

  return sortedTokens;
}
