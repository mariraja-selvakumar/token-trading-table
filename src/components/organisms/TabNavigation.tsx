"use client";

import { memo } from "react";
import { TokenCategory } from "@/types/token";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveCategory } from "@/features/tokens/tokenSlice";

interface Tab {
  id: TokenCategory;
  label: string;
  count?: number;
}

const tabs: Tab[] = [
  { id: "new-pairs", label: "New Pairs" },
  { id: "final-stretch", label: "Final Stretch" },
  { id: "migrated", label: "Migrated" },
];

export const TabNavigation = memo(function TabNavigation() {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.tokens.activeCategory);
  const tokens = useAppSelector((state) => state.tokens.tokens);

  const handleTabClick = (categoryId: TokenCategory) => {
    dispatch(setActiveCategory(categoryId));
  };

  return (
    <div className="border-b border-border">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeCategory === tab.id;
          const count = tokens[tab.id]?.length || 0;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "px-6 py-3 font-medium text-sm transition-all relative whitespace-nowrap",
                "hover:text-foreground",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <span className="flex items-center gap-2">
                {tab.label}
                {count > 0 && (
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs rounded-full",
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                )}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});
