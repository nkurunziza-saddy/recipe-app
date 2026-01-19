import { RiFireLine, RiStarFill, RiTimeLine } from "@remixicon/react";
import type { Recipe } from "@/lib/types/recipe";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

export function RecipeCard({
  recipe,
  actions,
}: {
  recipe: Recipe;
  actions?: React.ReactNode;
}) {
  return (
    <div className="h-full group">
      <Card
        className={cn(
          "relative w-full overflow-hidden !gap-0 !p-0 h-full hover:ring-primary transition-colors duration-300"
        )}
      >
        <Link
          to="/recipes/$recipeId"
          params={{ recipeId: recipe.id.toString() }}
          className="block h-full"
        >
          <div className="aspect-video bg-muted relative overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.name}
              title={recipe.name}
              loading="lazy"
              className="object-cover w-full h-full"
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER_IMAGE;
              }}
            />
            <div className="absolute top-2 right-2">
              <span className="text-[10px] flex items-center gap-0.5 font-medium bg-background/90 backdrop-blur px-1.5 py-0.5 rounded shadow-sm">
                <RiStarFill size={10} className="text-orange-400" /> {recipe.rating}
              </span>
            </div>
          </div>
          <CardContent className="px-3 py-2 space-y-2">
            <CardHeader className="p-0 gap-1">
              <CardTitle className="line-clamp-1 text-sm font-semibold">
                {recipe.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-0.5">
                  <RiTimeLine size={12} />
                  {recipe.cookTimeMinutes}m
                </span>
                <span className="flex items-center gap-0.5">
                  <RiFireLine size={12} />
                  {recipe.caloriesPerServing} cal
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-medium">
                  {recipe.difficulty}
                </span>
              </CardDescription>
            </CardHeader>
            <div className="relative h-6">

              <div
                className={cn(
                  "flex flex-wrap gap-1 absolute inset-0 transition-opacity duration-200",
                )}
              >
                {recipe.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-1.5 py-0.5 rounded-md border border-border text-muted-foreground bg-muted/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {actions && (
                <div
                  className="flex items-center justify-end gap-2 absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  onClick={(e) => e.preventDefault()}
                >
                  {actions}
                </div>
              )}
            </div>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}
