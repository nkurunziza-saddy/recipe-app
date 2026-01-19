import { Link } from "@tanstack/react-router";
import { RiArrowRightLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { selectCurrentUser } from "@/lib/store/slices/auth-slice";

export function Hero() {
  const user = useAppSelector(selectCurrentUser);
  return (
    <section className="py-16 border-b border-border">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
          Discover Delicious Recipes
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Browse thousands of recipes, find your favorites, and cook something amazing today.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            to="/recipes"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Browse Recipes <RiArrowRightLine size={16} />
          </Link>
          {user ? (
            <Link
              to="/dashboard"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
