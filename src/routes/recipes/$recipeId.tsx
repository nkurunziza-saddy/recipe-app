import { createFileRoute, Link } from "@tanstack/react-router";
import { useGetRecipeQuery } from "@/features/recipes/recipesApi";
import {
  RiTimeLine,
  RiFireLine,
  RiUserStarLine,
  RiLoader4Line,
  RiArrowLeftLine,
  RiCheckboxCircleLine,
  RiCheckDoubleLine,
} from "@remixicon/react";

export const Route = createFileRoute("/recipes/$recipeId")({
  component: RecipeDetail,
});

function RecipeDetail() {
  const { recipeId } = Route.useParams();
  const {
    data: recipe,
    isLoading,
    isError,
  } = useGetRecipeQuery(Number(recipeId));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <RiLoader4Line className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (isError || !recipe) {
    return (
      <div className="text-center py-20 px-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Recipe not found
        </h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
        >
          <RiArrowLeftLine size={20} /> Back to recipes
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-background min-h-screen">
      {/* Hero Header */}
      <div className="relative h-[400px] w-full overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-secondary/20">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-md text-sm font-medium border border-border"
          >
            <RiArrowLeftLine size={16} /> Back
          </Link>

          <div className="flex flex-wrap gap-3 mb-4">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground border border-primary-foreground/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight max-w-3xl">
            {recipe.name}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm font-semibold text-muted-foreground bg-background/90 backdrop-blur p-4 rounded-lg border border-border inline-flex">
            <div className="flex items-center gap-2">
              <RiTimeLine className="text-primary" size={20} />
              <span className="text-foreground">
                {recipe.cookTimeMinutes + recipe.prepTimeMinutes} min
              </span>
            </div>
            <div className="flex items-center gap-2">
              <RiFireLine className="text-destructive" size={20} />
              <span className="text-foreground">
                {recipe.caloriesPerServing} kcal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <RiUserStarLine className="text-blue-500" size={20} />
              <span className="text-foreground">{recipe.difficulty}</span>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-border">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="text-foreground">{recipe.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({recipe.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Ingredients Col */}
        <div className="md:col-span-1 space-y-8">
          <div className="bg-card border border-border rounded-lg p-6 shadow-none sticky top-24">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              Ingredients
              <span className="text-xs font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded ml-auto">
                {recipe.servings} servings
              </span>
            </h3>
            <ul className="space-y-3">
              {recipe.ingredients.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm text-foreground group cursor-pointer hover:bg-secondary/50 p-2 rounded transition-colors -mx-2"
                >
                  <div className="mt-0.5 text-muted-foreground group-hover:text-primary transition-colors">
                    <RiCheckboxCircleLine size={18} />
                  </div>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions Col */}
        <div className="md:col-span-2 space-y-10">
          <div>
            <h3 className="text-2xl font-black mb-8 border-b border-border pb-4">
              Instructions
            </h3>
            <div className="space-y-10">
              {recipe.instructions.map((step, idx) => (
                <div key={idx} className="flex gap-6 relative group">
                  <div className="flex-none flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    {idx !== recipe.instructions.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border my-2 group-hover:bg-primary/20 transition-colors" />
                    )}
                  </div>
                  <div className="flex-1 pt-1 pb-4">
                    <p className="text-lg text-foreground leading-relaxed font-medium">
                      {step}
                    </p>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                        <RiCheckDoubleLine size={14} /> Mark as complete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
