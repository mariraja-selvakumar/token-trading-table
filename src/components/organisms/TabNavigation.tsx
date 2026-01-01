"use client";

import { memo } from "react";
import { TokenCategory } from "@/types/token";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setActiveCategory } from "@/features/tokens/tokenSlice";
import { Zap, Target, CheckCircle, Grid3x3, List } from "lucide-react";

interface Tab {
  id: TokenCategory;
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { id: "new-pairs", label: "New Pairs", icon: <Zap size={16} /> },
  { id: "final-stretch", label: "Final Stretch", icon: <Target size={16} /> },
  { id: "migrated", label: "Migrated", icon: <CheckCircle size={16} /> },
];

interface TabNavigationProps {
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
}

export const TabNavigation = memo(function TabNavigation({
  viewMode,
  onViewModeChange,
}: TabNavigationProps) {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((state) => state.tokens.activeCategory);
  const tokens = useAppSelector((state) => state.tokens.tokens);

  const handleTabClick = (categoryId: TokenCategory) => {
    dispatch(setActiveCategory(categoryId));
  };

  return (
    <div className="flex items-center justify-between border-b border-border bg-card/30 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeCategory === tab.id;
          const count = tokens[tab.id]?.length || 0;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "px-4 py-3 font-medium text-sm transition-all relative whitespace-nowrap flex items-center gap-2",
                "hover:text-foreground",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {count > 0 && (
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs rounded-full font-semibold",
                    isActive
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              )}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2 px-4">
        <button
          onClick={() => onViewModeChange("grid")}
          className={cn(
            "p-2 rounded-lg transition-colors",
            viewMode === "grid"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          title="Grid View"
        >
          <Grid3x3 size={18} />
        </button>
        <button
          onClick={() => onViewModeChange("table")}
          className={cn(
            "p-2 rounded-lg transition-colors",
            viewMode === "table"
              ? "bg-primary text-white"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
          title="Table View"
        >
          <List size={18} />
        </button>
      </div>
    </div>
  );
});
