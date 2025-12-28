"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TradingLayout } from "@/components/templates/TradingLayout";
import { TabNavigation } from "@/components/organisms/TabNavigation";
import { TokenTable } from "@/components/organisms/TokenTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTokens, setLoading, setError } from "@/features/tokens/tokenSlice";
import { fetchAllTokens } from "@/features/tokens/tokenAPI";
import { useWebSocket } from "@/hooks/useWebSocket";
import { TokenCategory } from "@/types/token";

export default function Home() {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.tokens.activeCategory);
  const tokens = useAppSelector((state) => state.tokens.tokens);
  const loading = useAppSelector((state) => state.tokens.loading);

  // Fetch tokens using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchAllTokens,
    refetchInterval: 60000, // Refetch every minute
  });

  // Initialize WebSocket for real-time updates
  useWebSocket();

  // Update Redux store when data is fetched
  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading("loading"));
    } else if (error) {
      dispatch(setLoading("error"));
      dispatch(
        setError(
          error instanceof Error ? error.message : "Failed to load tokens"
        )
      );
    } else if (data?.status === "success") {
      dispatch(setLoading("success"));

      // Load all categories
      const categories: TokenCategory[] = [
        "new-pairs",
        "final-stretch",
        "migrated",
      ];
      categories.forEach((category) => {
        dispatch(
          setTokens({
            category,
            tokens: data.data[category],
          })
        );
      });
    }
  }, [data, isLoading, error, dispatch]);

  // Get active tokens
  const activeTokens = tokens[activeCategory] || [];

  return (
    <TradingLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Token Discovery
          </h1>
          <p className="text-muted-foreground">
            Track new token pairs, final stretch tokens, and migrated tokens in
            real-time
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <TabNavigation />

          {/* Token Table */}
          <div className="p-6">
            {error ? (
              <div className="text-center py-12">
                <div className="text-red-500 mb-2">Failed to load tokens</div>
                <p className="text-muted-foreground text-sm">
                  {error instanceof Error ? error.message : "Unknown error"}
                </p>
              </div>
            ) : (
              <TokenTable
                tokens={activeTokens}
                loading={loading === "loading"}
              />
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-muted-foreground text-sm mb-1">
              Total Tokens
            </div>
            <div className="text-2xl font-bold text-foreground">
              {Object.values(tokens).reduce((acc, arr) => acc + arr.length, 0)}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-muted-foreground text-sm mb-1">
              Active Category
            </div>
            <div className="text-2xl font-bold text-foreground capitalize">
              {activeCategory.replace("-", " ")}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-muted-foreground text-sm mb-1">
              Last Update
            </div>
            <div className="text-2xl font-bold text-foreground">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </TradingLayout>
  );
}
