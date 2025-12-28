import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Token, TokenCategory } from "@/types/token";

// Merge Tailwind classes with conflict resolution
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price with appropriate decimal places
export function formatPrice(price: number): string {
  if (price === 0) return "$0.00";
  if (price < 0.000001) return `$${price.toExponential(2)}`;
  if (price < 0.01) return `$${price.toFixed(8)}`;
  if (price < 1) return `$${price.toFixed(6)}`;
  if (price < 100) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(2)}`;
}

// Format large numbers with K, M, B suffixes
export function formatNumber(num: number): string {
  if (num === 0) return "$0";
  if (num < 1000) return `$${num.toFixed(2)}`;
  if (num < 1000000) return `$${(num / 1000).toFixed(2)}K`;
  if (num < 1000000000) return `$${(num / 1000000).toFixed(2)}M`;
  return `$${(num / 1000000000).toFixed(2)}B`;
}

// Format percentage change
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

// Truncate address (e.g., 0x1234...5678)
export function truncateAddress(address: string, start = 6, end = 4): string {
  if (address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generate random token data for mock
export function generateMockToken(category: string, index: number): Token {
  const names = [
    "PEPE",
    "DOGE",
    "SHIB",
    "FLOKI",
    "BONK",
    "WIF",
    "MEW",
    "POPCAT",
    "BRETT",
    "MOG",
  ];
  const randomName = names[Math.floor(Math.random() * names.length)];

  return {
    id: `${category}-${index}`,
    name: randomName,
    symbol: randomName.toUpperCase(),
    address: `0x${Math.random().toString(16).slice(2, 42)}`,
    price: Math.random() * 0.01,
    priceChange24h: (Math.random() - 0.5) * 50,
    volume24h: Math.random() * 10000000,
    volumeChange24h: (Math.random() - 0.5) * 100,
    marketCap: Math.random() * 100000000,
    liquidity: Math.random() * 5000000,
    holders: Math.floor(Math.random() * 50000),
    category: category as TokenCategory,
    timestamp: Date.now(),
  };
}
