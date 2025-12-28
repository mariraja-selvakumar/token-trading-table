import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, TokenCategory, SortConfig, LoadingState } from "@/types/token";

interface TokensState {
  tokens: Record<TokenCategory, Token[]>;
  loading: LoadingState;
  error: string | null;
  sortConfig: SortConfig;
  activeCategory: TokenCategory;
}

const initialState: TokensState = {
  tokens: {
    "new-pairs": [],
    "final-stretch": [],
    migrated: [],
  },
  loading: "idle",
  error: null,
  sortConfig: {
    key: "volume24h",
    direction: "desc",
  },
  activeCategory: "new-pairs",
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ category: TokenCategory; tokens: Token[] }>
    ) => {
      state.tokens[action.payload.category] = action.payload.tokens;
    },
    updateToken: (
      state,
      action: PayloadAction<{
        category: TokenCategory;
        token: Partial<Token> & { id: string };
      }>
    ) => {
      const { category, token } = action.payload;
      const index = state.tokens[category].findIndex((t) => t.id === token.id);
      if (index !== -1) {
        state.tokens[category][index] = {
          ...state.tokens[category][index],
          ...token,
        };
      }
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<TokenCategory>) => {
      state.activeCategory = action.payload;
    },
    setLoading: (state, action: PayloadAction<LoadingState>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTokens,
  updateToken,
  setSortConfig,
  setActiveCategory,
  setLoading,
  setError,
} = tokensSlice.actions;

export default tokensSlice.reducer;
