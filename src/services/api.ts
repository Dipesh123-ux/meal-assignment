import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const api = {
  getCategories: async () => {
    const response = await axios.get(`${API_BASE_URL}/categories.php`);
    return response.data.categories;
  },
  getMealsByCategory: async (category: string) => {
    const response = await axios.get(`${API_BASE_URL}/filter.php?c=${category}`);
    return response.data.meals;
  },
  getMealDetails: async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/lookup.php?i=${id}`);
    return response.data.meals[0];
  },
};