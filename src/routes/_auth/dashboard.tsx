import { createFileRoute } from "@tanstack/react-router";
import { useGetRecipesQuery } from "@/features/recipes/recipesApi";
import { RecipeCard } from "@/features/recipes/RecipeCard";
import { RiAddLine, RiLoader4Line } from "@remixicon/react";

export const Route = createFileRoute("/_auth/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { data, isLoading } = useGetRecipesQuery({ limit: 6 });

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-card p-4 rounded-lg border border-border shadow-none gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Recipe Dashboard
          </h2>
          <p className="text-xs text-muted-foreground">
            Manage your culinary creations
          </p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-md shadow-sm hover:opacity-90 transition-all flex items-center gap-2 text-sm">
          <RiAddLine size={16} /> Add Recipe
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <RiLoader4Line className="animate-spin text-primary" size={24} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.recipes.map((recipe) => (
            <div key={recipe.id} className="relative group">
              <RecipeCard recipe={recipe} />
              {/* Overlay actions for dashboard */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Edit simulated");
                  }}
                  className="p-1.5 bg-background border border-border rounded hover:bg-muted text-primary shadow-sm"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Delete simulated");
                  }}
                  className="p-1.5 bg-background border border-border rounded hover:bg-red-50 text-destructive shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
