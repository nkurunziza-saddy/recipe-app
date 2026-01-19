import { RiFireLine, RiTimeLine, RiUserStarLine } from "@remixicon/react";
import type { Recipe } from "@/features/recipes/recipesApi";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Link } from "@tanstack/react-router";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recipes/${recipe.id}`} className="block h-full">
      <Card className="h-full flex flex-col group cursor-pointer hover:border-primary transition-colors border-border shadow-none">
        <div className="relative h-40 overflow-hidden bg-secondary/20">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <Badge
              variant="secondary"
              className="bg-foreground/90 backdrop-blur shadow-sm font-bold text-[10px] px-1.5 py-0.5"
            >
              ⭐ {recipe.rating}
            </Badge>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-tight">
              {recipe.name}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1">
              <RiTimeLine size={14} className="text-primary" />
              {recipe.cookTimeMinutes}m
            </span>
            <span className="flex items-center gap-1">
              <RiFireLine size={14} className="text-destructive" />
              {recipe.caloriesPerServing}
            </span>
            <span className="flex items-center gap-1">
              <RiUserStarLine size={14} className="text-blue-500" />
              {recipe.difficulty}
            </span>
          </div>

          <div className="flex-1" />

          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border mt-2">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] py-0 px-1.5 h-5"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}
