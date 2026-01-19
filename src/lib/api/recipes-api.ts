import { apiSlice } from "../store/slices/api-slice";
import type { Recipe, RecipeParams, RecipeResponse } from "../types/recipe";

export const recipesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipeResponse, RecipeParams>({
      query: (params) => {
        if (params.q) {
          return `/recipes/search?q=${params.q}&limit=${params.limit || 0}&skip=${params.skip || 0}`;
        }

        let url = `/recipes?limit=${params.limit || 0}&skip=${params.skip || 0}`;
        if (params.sortBy) {
          url += `&sortBy=${params.sortBy}&order=${params.order || "asc"}`;
        }
        return url;
      },
      providesTags: ["recipe"],
    }),
    getRecipeById: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
    }),
    addRecipe: builder.mutation<Recipe, Recipe>({
      query: (recipe) => ({
        url: "/recipes",
        method: "POST",
        body: recipe,
      }),
      invalidatesTags: ["recipe"],
    }),
    updateRecipe: builder.mutation<Recipe, { id: number; recipe: Recipe }>({
      query: ({ id, recipe }) => ({
        url: `/recipes/${id}`,
        method: "PUT",
        body: recipe,
      }),
      invalidatesTags: ["recipe"],
    }),
    deleteRecipe: builder.mutation<void, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["recipe"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeByIdQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApi;
