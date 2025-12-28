"use client";

import { useEffect, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateToken } from "@/features/tokens/tokenSlice";
import { TokenCategory } from "@/types/token";

/**
 * Custom hook for WebSocket connection (mocked for this demo)
 * Simulates real-time price updates every 2-3 seconds
 */
export function useWebSocket() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokens.tokens);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const simulatePriceUpdate = useCallback(() => {
    const categories: TokenCategory[] = [
      "new-pairs",
      "final-stretch",
      "migrated",
    ];

    categories.forEach((category) => {
      const categoryTokens = tokens[category];
      if (categoryTokens.length === 0) return;

      // Update 2-3 random tokens per category
      const numUpdates = Math.floor(Math.random() * 3) + 2;

      for (let i = 0; i < numUpdates; i++) {
        const randomIndex = Math.floor(Math.random() * categoryTokens.length);
        const token = categoryTokens[randomIndex];

        if (token) {
          // Simulate price change (-2% to +2%)
          const priceChangePercent = (Math.random() - 0.5) * 0.04;
          const newPrice = token.price * (1 + priceChangePercent);

          // Update 24h change
          const changeAdjustment = (Math.random() - 0.5) * 2;
          const newChange = token.priceChange24h + changeAdjustment;

          dispatch(
            updateToken({
              category,
              token: {
                id: token.id,
                price: newPrice,
                priceChange24h: newChange,
                timestamp: Date.now(),
              },
            })
          );
        }
      }
    });
  }, [tokens, dispatch]);

  useEffect(() => {
    // Start WebSocket simulation
    intervalRef.current = setInterval(simulatePriceUpdate, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [simulatePriceUpdate]);

  return {
    isConnected: true,
    reconnect: () => {
      console.log("WebSocket reconnected");
    },
  };
}
