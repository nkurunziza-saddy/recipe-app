import { createFileRoute } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  selectRecipesLimit,
  selectRecipesOrder,
  selectRecipesPage,
  selectRecipesSearchQuery,
  selectRecipesSkip,
  selectRecipesSortBy,
  setOrder,
  setPage,
  setSearchQuery,
  setSortBy,
} from "@/lib/store/slices/recipes-slice";
import { useGetRecipesQuery } from "@/lib/api/recipes-api";
import { RecipeCard } from "@/features/recipe-card";
import { RiLoader4Line, RiSearchLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/recipes/")({
  component: RecipesPage,
});

function RecipesPage() {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectRecipesPage);
  const search = useAppSelector(selectRecipesSearchQuery);
  const sortBy = useAppSelector(selectRecipesSortBy);
  const order = useAppSelector(selectRecipesOrder);
  const limit = useAppSelector(selectRecipesLimit);
  const skip = useAppSelector(selectRecipesSkip);

  const effectiveLimit = limit || 12;

  const { data, isLoading, isError } = useGetRecipesQuery({
    limit: effectiveLimit,
    skip,
    q: search,
    sortBy,
    order,
  });

  const totalPages = data ? Math.ceil(data.total / effectiveLimit) : 0;

  return (
    <div className="space-y-6 pb-16">
   
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">Recipes</h1>
        <p className="text-sm text-muted-foreground">
          {data ? `${data.total} recipes available` : "Loading..."}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-80">
          <RiSearchLine
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={14}
          />
          <Input
            type="text"
            placeholder="Search recipes..."
            className="w-full pl-8 pr-3 py-1"
            value={search}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>

        <div className="flex gap-2">
          <Select
            value={sortBy}
            onValueChange={(value) => dispatch(setSortBy(value))}
            
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent >
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="caloriesPerServing">Calories</SelectItem>
              <SelectItem value="cookTimeMinutes">Cook Time</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => dispatch(setOrder(order === "asc" ? "desc" : "asc"))}
      size={"sm"}
          >
            {order}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <RiLoader4Line className="animate-spin text-primary" size={24} />
        </div>
      ) : isError ? (
        <div className="text-center py-16 text-destructive">
          <p className="font-medium">Failed to load recipes.</p>
        </div>
      ) : data?.recipes.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>No recipes found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-6">
            <Button
              disabled={page <= 1}
              onClick={() => dispatch(setPage(page - 1))}
            variant={"outline"}
            size={"sm"}
            >
              Previous
            </Button>
            <span className="px-3 py-1.5 text-xs text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              disabled={page >= totalPages}
              onClick={() => dispatch(setPage(page + 1))}
              variant={"outline"}
              size={"sm"}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
