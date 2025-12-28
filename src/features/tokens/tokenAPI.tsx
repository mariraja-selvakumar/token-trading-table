import { Token, TokenCategory, ApiResponse } from "@/types/token";
import { generateMockToken } from "@/lib/utils";

// Mock API delay to simulate network request
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch tokens by category (In production, this would be a real API call)
export async function fetchTokensByCategory(
  category: TokenCategory
): Promise<ApiResponse<Token[]>> {
  await delay(800); // Simulate network delay

  try {
    // Generate mock tokens
    const tokens: Token[] = Array.from({ length: 20 }, (_, i) =>
      generateMockToken(category, i)
    );

    return {
      data: tokens,
      status: "success",
    };
  } catch (error) {
    return {
      data: [],
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch tokens",
    };
  }
}

// Fetch all tokens
export async function fetchAllTokens(): Promise<
  ApiResponse<Record<TokenCategory, Token[]>>
> {
  await delay(1000);

  try {
    const categories: TokenCategory[] = [
      "new-pairs",
      "final-stretch",
      "migrated",
    ];
    const tokensByCategory: Record<TokenCategory, Token[]> = {
      "new-pairs": [],
      "final-stretch": [],
      migrated: [],
    };

    for (const category of categories) {
      const response = await fetchTokensByCategory(category);
      if (response.status === "success") {
        tokensByCategory[category] = response.data;
      }
    }

    return {
      data: tokensByCategory,
      status: "success",
    };
  } catch (error) {
    return {
      data: {
        "new-pairs": [],
        "final-stretch": [],
        migrated: [],
      },
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to fetch all tokens",
    };
  }
}
