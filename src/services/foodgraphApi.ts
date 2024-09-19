import { api } from "./api";

export const fetchCategories = async () => {
  return await api.getCategories();
};

export const fetchMealsByCategory = async (category: string) => {
  return await api.getMealsByCategory(category);
};

export const fetchMealDetailsById = async (id: string) => {
  return await api.getMealDetails(id);
};

export const fetchMealsByIngredient = async (ingredient: string) => {
  return await api.getMealsByIngredients(ingredient);
};
