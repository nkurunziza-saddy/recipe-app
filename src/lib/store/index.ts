import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
import { apiSlice } from "./slices/api-slice";
import recipesReducer from "./slices/recipes-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    recipes: recipesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
