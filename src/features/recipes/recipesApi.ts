import { apiSlice } from "../api/apiSlice";

export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

interface GetRecipesParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  q?: string;
}

export const recipesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query<RecipesResponse, GetRecipesParams>({
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
      providesTags: ["Recipe"],
    }),
    getRecipe: builder.query<Recipe, number>({
      query: (id) => `/recipes/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Recipe", id }],
    }),
    addRecipe: builder.mutation<Recipe, Partial<Recipe>>({
      query: (body) => ({
        url: "/recipes/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Recipe"],
    }),
    updateRecipe: builder.mutation<
      Recipe,
      { id: number; body: Partial<Recipe> }
    >({
      query: ({ id, body }) => ({
        url: `/recipes/${id}`,
        method: "PUT", // dummyjson uses PUT/PATCH
        body,
      }),
      invalidatesTags: ["Recipe"],
    }),
    deleteRecipe: builder.mutation<Recipe, number>({
      query: (id) => ({
        url: `/recipes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recipe"],
    }),
  }),
});

export const {
  useGetRecipesQuery,
  useGetRecipeQuery,
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
} = recipesApi;
