import { createFileRoute, Link } from "@tanstack/react-router";
import { useGetRecipeByIdQuery } from "@/lib/api/recipes-api";
import {
  RiTimeLine,
  RiFireLine,
  RiUserStarLine,
  RiLoader4Line,
  RiArrowLeftLine,
  RiCheckboxCircleLine,
  RiStarFill,
} from "@remixicon/react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recipes/$recipeId")({
  component: RecipeDetail,
});

function RecipeDetail() {
  const { recipeId } = Route.useParams();
  const {
    data: recipe,
    isLoading,
    isError,
  } = useGetRecipeByIdQuery(Number(recipeId));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <RiLoader4Line className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className="text-center py-20 px-6">
        <h2 className="text-xl font-bold text-foreground mb-4">
          Recipe not found
        </h2>
        <Link to="/" className={cn(buttonVariants({ variant: "outline" }))}>
          <RiArrowLeftLine size={16} />
          Back to recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-16 space-y-6">
      <Link to="/recipes" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
        <RiArrowLeftLine size={14} />
        Back
      </Link>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {recipe.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          {recipe.name}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <RiTimeLine size={14} className="text-primary" />
            {recipe.cookTimeMinutes + recipe.prepTimeMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <RiFireLine size={14} className="text-destructive" />
            {recipe.caloriesPerServing} kcal
          </span>
          <span className="flex items-center gap-1">
            <RiUserStarLine size={14} className="text-blue-500" />
            {recipe.difficulty}
          </span>
          <span className="flex items-center gap-1">
            <RiStarFill size={14} className="text-amber-500" /> {recipe.rating} ({recipe.reviewCount} reviews)
          </span>
        </div>
      </div>

      <div className="aspect-video w-full max-w-2xl rounded border border-border overflow-hidden bg-muted">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Ingredients
              <Badge variant="outline">{recipe.servings} servings</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {recipe.ingredients.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <RiCheckboxCircleLine size={14} className="mt-0.5 text-muted-foreground shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold border-b border-border pb-2">
            Instructions
          </h3>
          <ol className="space-y-4">
            {recipe.instructions.map((step, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <div className="size-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium shrink-0">
                  {idx + 1}
                </div>
                <p className="text-sm text-foreground pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
