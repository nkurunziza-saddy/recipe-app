import { useState } from "react";
import { useGetRecipesQuery } from "./recipesApi";
import { RecipeCard } from "./RecipeCard";
import { RiLoader4Line, RiSearchLine } from "@remixicon/react";

export function RecipeList() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const limit = 9;

  const { data, isLoading, isError } = useGetRecipesQuery({
    limit,
    skip: page * limit,
    q: search,
    sortBy,
    order,
  });

  // Debounce search could be added here for optimization

  return (
    <div className="space-y-8">
      {/* Controls */}
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-3 rounded-lg border border-border">
        <div className="relative w-full md:w-96">
          <RiSearchLine
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full pl-9 pr-4 py-2 rounded-md bg-background border border-border focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-muted-foreground text-foreground text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <select
            className="px-3 py-2 rounded-md bg-background border border-border outline-none cursor-pointer text-foreground text-sm focus:ring-1 focus:ring-primary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="caloriesPerServing">Calories</option>
            <option value="rating">Rating</option>
          </select>

          <button
            onClick={() =>
              setOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="px-4 py-2 rounded-md bg-background border border-border hover:bg-muted transition-colors font-medium text-xs text-foreground uppercase tracking-wider"
          >
            {order}
          </button>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <RiLoader4Line className="animate-spin text-primary" size={48} />
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-red-500 bg-red-50/50 rounded-2xl">
          <p className="font-bold">Failed to load recipes.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4 pt-8">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="px-6 py-2 rounded-lg bg-background border border-border disabled:opacity-50 hover:bg-muted transition-all font-semibold text-primary shadow-sm"
            >
              Previous
            </button>
            <span className="flex items-center font-medium text-muted-foreground">
              Page {page + 1}
            </span>
            <button
              disabled={!data || data.skip + data.limit >= data.total}
              onClick={() => setPage((p) => p + 1)}
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-all font-bold shadow-md"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
