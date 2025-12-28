import { configureStore } from "@reduxjs/toolkit";
import tokensReducer from "@/features/tokens/tokenSlice";

export const store = configureStore({
  reducer: {
    tokens: tokensReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
