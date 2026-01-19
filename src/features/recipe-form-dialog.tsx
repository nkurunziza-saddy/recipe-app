import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import type { Recipe } from "@/lib/types/recipe";
import { RiLoader4Line } from "@remixicon/react";
import { toast } from "sonner";

interface RecipeFormData {
  name: string;
  ingredients: string;
  instructions: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  caloriesPerServing: number;
  tags: string;
  image: string;
}

interface RecipeFormDialogProps {
  trigger: React.ReactNode;
  recipe?: Recipe;
  isEdit?: boolean;
  onSave: (data: RecipeFormData) => Promise<void>;
}

const defaultFormData: RecipeFormData = {
  name: "",
  ingredients: "",
  instructions: "",
  prepTimeMinutes: 10,
  cookTimeMinutes: 20,
  servings: 4,
  difficulty: "Easy",
  cuisine: "",
  caloriesPerServing: 200,
  tags: "",
  image: "",
};

export function RecipeFormDialog({
  trigger,
  recipe,
  isEdit = false,
  onSave,
}: RecipeFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RecipeFormData>(defaultFormData);

  useEffect(() => {
    if (recipe && isEdit) {
      setFormData({
        name: recipe.name,
        ingredients: recipe.ingredients.join("\n"),
        instructions: recipe.instructions.join("\n"),
        prepTimeMinutes: recipe.prepTimeMinutes,
        cookTimeMinutes: recipe.cookTimeMinutes,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine,
        caloriesPerServing: recipe.caloriesPerServing,
        tags: recipe.tags.join(", "),
        image: recipe.image,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [recipe, isEdit, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSave(formData);
      toast.success(isEdit ? "Recipe updated successfully" : "Recipe added successfully");
      setOpen(false);
      setFormData(defaultFormData);
    } catch (error) {
      console.error("Failed to save recipe:", error);
      toast.error("Failed to save recipe");
    } finally {
      setIsLoading(false);
    }
  };

  const updateField = <K extends keyof RecipeFormData>(
    key: K,
    value: RecipeFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Recipe" : "Add Recipe"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update the recipe details below."
              : "Fill in the details to create a new recipe."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel>
                <Label htmlFor="name">Name</Label>
              </FieldLabel>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="Recipe name"
                required
              />
            </Field>

            <Field>
              <FieldLabel>
                <Label htmlFor="image">Image URL</Label>
              </FieldLabel>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => updateField("image", e.target.value)}
                placeholder="https://..."
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>
                  <Label htmlFor="prepTime">Prep Time (min)</Label>
                </FieldLabel>
                <Input
                  id="prepTime"
                  type="number"
                  value={formData.prepTimeMinutes}
                  onChange={(e) =>
                    updateField("prepTimeMinutes", Number(e.target.value))
                  }
                  min={0}
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label htmlFor="cookTime">Cook Time (min)</Label>
                </FieldLabel>
                <Input
                  id="cookTime"
                  type="number"
                  value={formData.cookTimeMinutes}
                  onChange={(e) =>
                    updateField("cookTimeMinutes", Number(e.target.value))
                  }
                  min={0}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>
                  <Label htmlFor="servings">Servings</Label>
                </FieldLabel>
                <Input
                  id="servings"
                  type="number"
                  value={formData.servings}
                  onChange={(e) =>
                    updateField("servings", Number(e.target.value))
                  }
                  min={1}
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label htmlFor="calories">Calories</Label>
                </FieldLabel>
                <Input
                  id="calories"
                  type="number"
                  value={formData.caloriesPerServing}
                  onChange={(e) =>
                    updateField("caloriesPerServing", Number(e.target.value))
                  }
                  min={0}
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel>
                  <Label>Difficulty</Label>
                </FieldLabel>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    updateField("difficulty", value as "Easy" | "Medium" | "Hard")
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>
                  <Label htmlFor="cuisine">Cuisine</Label>
                </FieldLabel>
                <Input
                  id="cuisine"
                  value={formData.cuisine}
                  onChange={(e) => updateField("cuisine", e.target.value)}
                  placeholder="Italian, Asian..."
                />
              </Field>
            </div>

            <Field>
              <FieldLabel>
                <Label htmlFor="tags">Tags (comma separated)</Label>
              </FieldLabel>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => updateField("tags", e.target.value)}
                placeholder="healthy, quick, vegan"
              />
            </Field>

            <Field>
              <FieldLabel>
                <Label htmlFor="ingredients">Ingredients (one per line)</Label>
              </FieldLabel>
              <Textarea
                id="ingredients"
                value={formData.ingredients}
                onChange={(e) => updateField("ingredients", e.target.value)}
                placeholder="1 cup flour&#10;2 eggs&#10;..."
                rows={4}
              />
            </Field>

            <Field>
              <FieldLabel>
                <Label htmlFor="instructions">Instructions (one per line)</Label>
              </FieldLabel>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) => updateField("instructions", e.target.value)}
                placeholder="Preheat oven to 350°F&#10;Mix ingredients..."
                rows={4}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <RiLoader4Line className="animate-spin" size={14} />
              ) : isEdit ? (
                "Save Changes"
              ) : (
                "Add Recipe"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
