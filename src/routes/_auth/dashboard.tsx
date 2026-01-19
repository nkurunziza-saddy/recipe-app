import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useGetRecipesQuery, useAddRecipeMutation, useUpdateRecipeMutation, useDeleteRecipeMutation } from "@/lib/api/recipes-api";
import { RecipeFormDialog } from "@/features/recipe-form-dialog";
import { DeleteConfirmDialog } from "@/features/delete-confirm-dialog";
import { RiAddLine, RiLoader4Line, RiEditLine, RiDeleteBinLine, RiStarFill } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Recipe } from "@/lib/types/recipe";

export const Route = createFileRoute("/_auth/dashboard")({
  component: Dashboard,
});

const PAGE_SIZE = 10;

function Dashboard() {
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useGetRecipesQuery({
    limit: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
  });
  
  const [addRecipe] = useAddRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
  const [deleteRecipe] = useDeleteRecipeMutation();

  const handleAddRecipe = async (formData: {
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
  }) => {
    await addRecipe({
      id: 0,
      name: formData.name,
      ingredients: formData.ingredients.split("\n").filter(Boolean),
      instructions: formData.instructions.split("\n").filter(Boolean),
      prepTimeMinutes: formData.prepTimeMinutes,
      cookTimeMinutes: formData.cookTimeMinutes,
      servings: formData.servings,
      difficulty: formData.difficulty,
      cuisine: formData.cuisine,
      caloriesPerServing: formData.caloriesPerServing,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: formData.image,
      userId: 1,
      rating: 0,
      reviewCount: 0,
      mealType: [],
    });
    refetch();
  };

  const handleEditRecipe = async (
    recipe: Recipe,
    formData: {
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
  ) => {
    await updateRecipe({
      id: recipe.id,
      recipe: {
        ...recipe,
        name: formData.name,
        ingredients: formData.ingredients.split("\n").filter(Boolean),
        instructions: formData.instructions.split("\n").filter(Boolean),
        prepTimeMinutes: formData.prepTimeMinutes,
        cookTimeMinutes: formData.cookTimeMinutes,
        servings: formData.servings,
        difficulty: formData.difficulty,
        cuisine: formData.cuisine,
        caloriesPerServing: formData.caloriesPerServing,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
        image: formData.image,
      },
    });
    refetch();
  };

  const handleDeleteRecipe = async (id: number) => {
    await deleteRecipe(id);
    refetch();
  };

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <div className="space-y-6 pb-16">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recipe Dashboard</CardTitle>
            <CardDescription>Manage your culinary creations</CardDescription>
          </div>
          <RecipeFormDialog
            trigger={
              <Button size="sm">
                <RiAddLine size={14} />
                Add Recipe
              </Button>
            }
            onSave={handleAddRecipe}
          />
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-16">
              <RiLoader4Line className="animate-spin text-primary" size={24} />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]"></TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Cuisine</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead className="text-right">Rating</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.recipes.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No recipes found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.recipes.map((recipe) => (
                        <TableRow key={recipe.id}>
                          <TableCell>
                            <Avatar className="h-10 w-10 rounded-md">
                              <AvatarImage src={recipe.image} alt={recipe.name} />
                              <AvatarFallback className="rounded-md">{recipe.name[0]}</AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell className="font-medium">{recipe.name}</TableCell>
                          <TableCell>{recipe.cuisine}</TableCell>
                          <TableCell>
                            <span className={
                              recipe.difficulty === 'Easy' ? 'text-green-600' :
                              recipe.difficulty === 'Medium' ? 'text-yellow-600' :
                              'text-red-600'
                            }>
                              {recipe.difficulty}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <RiStarFill size={14} className="text-orange-400" />
                              {recipe.rating}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <RecipeFormDialog
                                trigger={
                                  <Button size="icon-sm" variant="ghost" className="h-8 w-8 p-0">
                                    <RiEditLine size={16} />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                }
                                recipe={recipe}
                                isEdit
                                onSave={(formData) => handleEditRecipe(recipe, formData)}
                              />
                              <DeleteConfirmDialog
                                trigger={
                                  <Button
                                    size="icon-sm"
                                    variant="ghost"
                                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                  >
                                    <RiDeleteBinLine size={16} />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                }
                                onConfirm={() => handleDeleteRecipe(recipe.id)}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

        
              <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <div className="text-xs text-muted-foreground">
                    Page {page} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
