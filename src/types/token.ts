// Token category types
export type TokenCategory = "new-pairs" | "final-stretch" | "migrated";

// Main token interface
export interface Token {
  id: string;
  name: string;
  symbol: string;
  address: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  volumeChange24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  category: TokenCategory;
  timestamp: number;
  logo?: string;
}

// Sort configuration
export interface SortConfig {
  key: keyof Token;
  direction: "asc" | "desc";
}

// WebSocket message types
export interface WebSocketMessage {
  type: "price_update" | "new_token" | "token_migrated";
  data: Partial<Token>;
}

// Table column definition
export interface TableColumn {
  key: keyof Token;
  label: string;
  sortable: boolean;
  width?: string;
  align?: "left" | "center" | "right";
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  status: "success" | "error";
  message?: string;
}

// Loading state
export type LoadingState = "idle" | "loading" | "success" | "error";
