"use client";

import { memo, useState, useEffect } from "react";
import { Token, TableColumn } from "@/types/token";
import { TokenRow } from "./TokenRow";
import { TableHeader } from "./TableHeader";
import { SkeletonRow } from "./SkeletonRow";
import { TokenModal } from "./TokenModal";
import { useSorting } from "@/hooks/useSorting";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSortConfig } from "@/features/tokens/tokenSlice";

interface TokenTableProps {
  tokens: Token[];
  loading?: boolean;
}

const columns: TableColumn[] = [
  {
    key: "name",
    label: "Token",
    sortable: true,
    width: "220px",
    align: "left",
  },
  {
    key: "price",
    label: "Price",
    sortable: true,
    width: "140px",
    align: "right",
  },
  {
    key: "priceChange24h",
    label: "24h %",
    sortable: true,
    width: "120px",
    align: "left",
  },
  {
    key: "volume24h",
    label: "Volume",
    sortable: true,
    width: "140px",
    align: "right",
  },
  {
    key: "marketCap",
    label: "Market Cap",
    sortable: true,
    width: "140px",
    align: "right",
  },
  {
    key: "liquidity",
    label: "Liquidity",
    sortable: true,
    width: "140px",
    align: "right",
  },
  {
    key: "holders",
    label: "Holders",
    sortable: true,
    width: "120px",
    align: "right",
  },
  {
    key: "id",
    label: "Actions",
    sortable: false,
    width: "100px",
    align: "right",
  },
];

export const TokenTable = memo(function TokenTable({
  tokens,
  loading = false,
}: TokenTableProps) {
  const dispatch = useAppDispatch();
  const sortConfig = useAppSelector((state) => state.tokens.sortConfig);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [previousPrices, setPreviousPrices] = useState<Record<string, number>>(
    {}
  );

  // Memoize sorted tokens
  const sortedTokens = useSorting(tokens, sortConfig);

  // Track price changes for flash effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const newPrices: Record<string, number> = {};
      tokens.forEach((token) => {
        newPrices[token.id] = token.price;
      });
      setPreviousPrices(newPrices);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [tokens]);

  const handleSort = (key: TableColumn["key"]) => {
    dispatch(
      setSortConfig({
        key: key as keyof Token,
        direction:
          sortConfig.key === key && sortConfig.direction === "desc"
            ? "asc"
            : "desc",
      })
    );
  };

  const handleRowClick = (token: Token) => {
    setSelectedToken(token);
  };

  return (
    <>
      <div className="w-full overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full border-collapse">
          <TableHeader
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          <tbody>
            {loading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : sortedTokens.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-muted-foreground"
                >
                  No tokens found
                </td>
              </tr>
            ) : (
              sortedTokens.map((token) => (
                <TokenRow
                  key={token.id}
                  token={token}
                  previousPrice={previousPrices[token.id]}
                  onRowClick={handleRowClick}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <TokenModal
        token={selectedToken}
        isOpen={!!selectedToken}
        onClose={() => setSelectedToken(null)}
      />
    </>
  );
});
