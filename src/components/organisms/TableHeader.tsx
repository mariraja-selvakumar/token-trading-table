"use client";

import { memo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { SortConfig, TableColumn } from "@/types/token";
import { cn } from "@/lib/utils";

interface TableHeaderProps {
  columns: TableColumn[];
  sortConfig: SortConfig;
  onSort: (key: TableColumn["key"]) => void;
}

export const TableHeader = memo(function TableHeader({
  columns,
  sortConfig,
  onSort,
}: TableHeaderProps) {
  const getSortIcon = (columnKey: TableColumn["key"]) => {
    if (sortConfig.key !== columnKey) {
      return (
        <ArrowUpDown size={14} className="opacity-0 group-hover:opacity-50" />
      );
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp size={14} className="text-primary" />
    ) : (
      <ArrowDown size={14} className="text-primary" />
    );
  };

  return (
    <thead className="bg-muted/50 sticky top-0 z-10">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={cn(
              "px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider",
              column.sortable && "cursor-pointer select-none group",
              column.align === "right" && "text-right",
              column.align === "center" && "text-center",
              column.key === "name" && "sticky left-0 bg-muted/50 z-20"
            )}
            style={{ width: column.width }}
            onClick={() => column.sortable && onSort(column.key)}
          >
            <div
              className={cn(
                "flex items-center gap-2",
                column.align === "right" && "justify-end",
                column.align === "center" && "justify-center"
              )}
            >
              <span>{column.label}</span>
              {column.sortable && getSortIcon(column.key)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
});
