import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/layout/hero";
import { useGetRecipesQuery } from "@/lib/api/recipes-api";
import { RecipeCard } from "@/features/recipe-card";
import { Link } from "@tanstack/react-router";
import { RiArrowRightLine, RiLoader4Line } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data, isLoading } = useGetRecipesQuery({ limit: 6 });

  return (
    <div className="space-y-12 pb-16">
      <Hero />

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">Featured Recipes</h2>
          <Link
            to="/recipes"
            className={cn(buttonVariants({ variant: "link" }))}
          >
            View all <RiArrowRightLine size={14} />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <RiLoader4Line className="animate-spin text-primary" size={24} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.recipes.slice(0, 6).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
