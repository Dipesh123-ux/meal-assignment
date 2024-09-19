import { Node, Edge } from "reactflow";

export const handleSetCategories = async (
  categories: any,
  setNodes: Function,
  setEdges: Function
) => {
  const categoryNodes: Node[] = categories
    .slice(0, 5)
    .map((category: any, index: any) => ({
      id: `category-${category.strCategory}`,
      type: "categoryNode",
      data: { label: category.strCategory },
      position: { x: 200, y: index * 100 - 200 },
    }));

  const categoryEdges: Edge[] = categoryNodes.map((node) => ({
    id: `explore-to-${node.id}`,
    source: "explore",
    target: node.id,
  }));
  setNodes((nds: Node[]) => [...nds, ...categoryNodes]);
  setEdges((edges: Edge[]) => [...edges, ...categoryEdges]);
};

export const handleSetMeals = async (
  meals: any,
  srcId: string,
  setNodes: Function,
  setEdges: Function,
  position: number
) => {
  const mealNodes: Node[] = meals
    .slice(0, 5)
    .map((meal: any, index: number) => ({
      id: `meal-${srcId}-${meal.idMeal}`,
      type: "mealNode",
      data: { label: meal.strMeal },
      position: { x: position, y: index * 100 - 200 },
    }));

  const mealEdges: Edge[] = mealNodes.map((node) => ({
    id: `${srcId}-to-${node.id}`,
    source: srcId,
    target: node.id,
  }));

  setNodes((nds: Node[]) => [...nds, ...mealNodes]);
  setEdges((eds: Edge[]) => [...eds, ...mealEdges]);
};

export const AddViewMealsNode = (
  id: string,
  src: string,
  setNodes: Function,
  setEdges: Function,
  position: number
) => {
  const vieMealNode: Node = {
    id: `viewmeal-${id}`,
    type: "viewNode",
    data: { label: "View meals", category: id },
    position: { x: position, y: 0 },
  };

  const viewMealEdge: Edge = {
    id: `${src}-to-${vieMealNode.id}`,
    source: id,
    target: vieMealNode.id,
  };

  setNodes((nds: Node[]) => [...nds, vieMealNode]);
  setEdges((eds: Edge[]) => [...eds, viewMealEdge]);
};

export const createDetailNodesForMeal = (
  mealId: string,
  setNodes: Function,
  setEdges: Function,
  position: number
) => {
  const viewNodes = [
    {
      id: `view-ingredients-${mealId}`,
      type: "viewNode",
      data: { label: "View Ingredients" },
      position: { x: position, y: -100 },
    },
    {
      id: `view-tags-${mealId}`,
      type: "viewNode",
      data: { label: "View Tags" },
      position: { x: position, y: 0 },
    },
    {
      id: `view-details-${mealId}`,
      type: "viewNode",
      data: { label: "View Details" },
      position: { x: position, y: 100 },
    },
  ];

  const viewEdges = viewNodes.map((node) => ({
    id: `meal-to-${node.id}`,
    source: mealId,
    target: node.id,
  }));

  setNodes((nds: Node[]) => [...nds, ...viewNodes]);
  setEdges((eds: Edge[]) => [...eds, ...viewEdges]);
};

export const handleViewIngredients = (
  mealId: string,
  selectedMeal: any,
  setNodes: Function,
  setEdges: Function,
  position : number
) => {
  const ingredientsWithMeasures = [];

  for (let i = 1; i <= 5; i++) {
    const ingredient = selectedMeal[`strIngredient${i}`];
    const measure = selectedMeal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredientsWithMeasures.push({ ingredient, measure });
    }
  }

  const ingredientNodes = ingredientsWithMeasures.map((item, index) => ({
    id: `ingredient-${mealId}-${item.ingredient}`,
    type: "ingredientNode",
    data: { label: `${item.ingredient} (${item.measure})` },
    position: { x: position, y: (index - 3) * 100 },
  }));

  const ingredientEdges = ingredientNodes.map((node) => ({
    id: `view-ingredients-to-${node.id}`,
    source: mealId,
    target: node.id,
  }));

  setNodes((nds: Node[]) => [...nds, ...ingredientNodes]);
  setEdges((eds: Edge[]) => [...eds, ...ingredientEdges]);
};

export const handleViewTags = (
  mealId: string,
  selectedMeal: any,
  setNodes: Function,
  setEdges: Function,
  position : number
) => {
  const tagNodes = selectedMeal.strTags
    ? selectedMeal.strTags.split(",").map((tag: string, index: number) => ({
        id: `tag-${mealId}-${index}`,
        type: "tagNode",
        data: { label: tag },
        position: { x: position, y: index * 100 + 250 },
      }))
    : [];

  const tagEdges = tagNodes.map((node: Node) => ({
    id: `view-tags-to-${node.id}`,
    source: mealId,
    target: node.id,
  }));

  setNodes((nds: Node[]) => [...nds, ...tagNodes]);
  setEdges((eds: Edge[]) => [...eds, ...tagEdges]);
};
