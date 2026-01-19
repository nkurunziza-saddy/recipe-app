import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RecipesState {
  searchQuery: string;
  sortBy: string;
  order: "asc" | "desc";
  limit: number;
  skip: number;
}

const initialState: RecipesState = {
  searchQuery: "",
  sortBy: "",
  order: "asc",
  limit: 10,
  skip: 0,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.skip = 0;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setOrder: (state, action: PayloadAction<"asc" | "desc">) => {
      state.order = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
      state.skip = 0;
    },
    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
        const page = action.payload;
        if (page > 0) {
            state.skip = (page - 1) * state.limit;
        }
    },
    resetFilters: (state) => {
        state.searchQuery = "";
        state.sortBy = "";
        state.order = "asc";
        state.limit = 10;
        state.skip = 0;
    }
  },
});

export const { setSearchQuery, setSortBy, setOrder, setLimit, setSkip, setPage, resetFilters } = recipesSlice.actions;

export default recipesSlice.reducer;

export const selectRecipesSearchQuery = (state: any) => state.recipes.searchQuery;
export const selectRecipesSortBy = (state: any) => state.recipes.sortBy;
export const selectRecipesOrder = (state: any) => state.recipes.order;
export const selectRecipesLimit = (state: any) => state.recipes.limit;
export const selectRecipesSkip = (state: any) => state.recipes.skip;
export const selectRecipesPage = (state: any) => Math.floor(state.recipes.skip / state.recipes.limit) + 1;
