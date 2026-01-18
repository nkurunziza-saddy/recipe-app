import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

import { RecipeList } from "../features/recipes/RecipeList";
import { Hero } from "../components/layout/Hero";

function Index() {
  return (
    <div className="space-y-12 pb-20">
      <Hero />
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-foreground mb-6">
          Latest Recipes
        </h2>
        <RecipeList />
      </div>
    </div>
  );
}
