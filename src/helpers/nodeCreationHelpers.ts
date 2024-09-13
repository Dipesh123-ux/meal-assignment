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
  setEdges: Function
) => {
  const mealNodes: Node[] = meals
    .slice(0, 5)
    .map((meal: any, index: number) => ({
      id: `meal-${meal.idMeal}`,
      type: "mealNode",
      data: { label: meal.strMeal },
      position: { x: 800, y: index * 100 - 200 },
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
  setNodes: Function,
  setEdges: Function
) => {
  const vieMealNode: Node = {
    id: `viewmeal-${id}`,
    type: "viewNode",
    data: { label: "View meals", category: id },
    position: { x: 400, y: 0 },
  };

  const viewMealEdge: Edge = {
    id: `category-to-${vieMealNode.id}`,
    source: id,
    target: vieMealNode.id,
  };

  setEdges((edgs: Edge[]) => {
    const filteredEdges = edgs.filter(
      (edge) => !edge.target.startsWith("viewmeal-")
    );
    return [...filteredEdges, viewMealEdge];
  });

  setNodes((nds: Node[]) => {
    const filteredNodes = nds.filter(
      (node) => !node.id.startsWith("viewmeal-")
    );
    return [...filteredNodes, vieMealNode];
  });
};

export const createDetailNodesForMeal = (
  mealId: string,
  setNodes: Function,
  setEdges: Function
) => {
  const viewNodes = [
    {
      id: `view-ingredients-${mealId}`,
      type: "viewNode",
      data: { label: "View Ingredients" },
      position: { x: 1200, y: -100 },
    },
    {
      id: `view-tags-${mealId}`,
      type: "viewNode",
      data: { label: "View Tags" },
      position: { x: 1200, y: 0 },
    },
    {
      id: `view-details-${mealId}`,
      type: "viewNode",
      data: { label: "View Details" },
      position: { x: 1200, y: 100 },
    },
  ];

  const viewEdges = viewNodes.map((node) => ({
    id: `meal-to-${node.id}`,
    source: `meal-${mealId}`,
    target: node.id,
  }));

  setNodes((nds: Node[]) => [...nds, ...viewNodes]);
  setEdges((eds: Edge[]) => [...eds, ...viewEdges]);
};

export const handleViewIngredients = (
  mealId: string,
  selectedMeal: any,
  setNodes: Function,
  setEdges: Function
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
    id: `ingredient-${mealId}-${index}`,
    type: "ingredientNode",
    data: { label: `${item.ingredient} (${item.measure})` },
    position: { x: 1600, y: (index - 3) * 100 },
  }));

  const ingredientEdges = ingredientNodes.map((node) => ({
    id: `view-ingredients-to-${node.id}`,
    source: `view-ingredients-${mealId}`,
    target: node.id,
  }));

  setNodes((nds: Node[]) => [...nds, ...ingredientNodes]);
  setEdges((eds: Edge[]) => [...eds, ...ingredientEdges]);
};

export const handleViewTags = (
  mealId: string,
  selectedMeal: any,
  setNodes: Function,
  setEdges: Function
) => {
  const tagNodes = selectedMeal.strTags
    ? selectedMeal.strTags.split(",").map((tag: string, index: number) => ({
        id: `tag-${mealId}-${index}`,
        type: "tagNode",
        data: { label: tag },
        position: { x: 1500, y: index * 100 + 250 },
      }))
    : [];

  const tagEdges = tagNodes.map((node: Node) => ({
    id: `view-tags-to-${node.id}`,
    source: `view-tags-${mealId}`,
    target: node.id,
  }));

  setNodes((nds: Node[]) => [...nds, ...tagNodes]);
  setEdges((eds: Edge[]) => [...eds, ...tagEdges]);
};
