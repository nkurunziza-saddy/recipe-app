import { RecipeList } from "@/features/recipes/RecipeList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipes/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-foreground mb-6">
        Latest Recipes
      </h2>
      <RecipeList />
    </div>
  );
}
