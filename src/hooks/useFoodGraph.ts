import { useCallback, useState } from "react";
import {
  Node,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { toast } from "react-toastify";
import {
  fetchCategories,
  fetchMealDetailsById,
  fetchMealsByCategory,
  fetchMealsByIngredient,
} from "../services/foodgraphApi";
import { bfsDeleteNodes, clearSiblingNodes } from "../helpers/graphHelpers";
import {
  AddViewMealsNode,
  createDetailNodesForMeal,
  handleSetCategories,
  handleSetMeals,
  handleViewIngredients,
  handleViewTags,
} from "../helpers/nodeCreationHelpers";

const initialNodes: Node[] = [
  {
    id: "explore",
    type: "exploreNode",
    data: { label: "Explore" },
    position: { x: 0, y: 0 },
  },
];

export const useFoodGraph = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [meals, setMeals] = useState<any[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [showSelectedMeal, setShowSelectedMeal] = useState<boolean>(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    async (_event: React.MouseEvent, node: Node) => {
      const nodeId = node.id;

      try {
        if (
          !nodeId.startsWith("view-tags-") &&
          !nodeId.startsWith("view-ingredients-") &&
          !nodeId.startsWith("view-details-")
        ) {
          setShowSelectedMeal(false);
          clearSiblingNodes(nodeId, edges, nodes, setNodes, setEdges);
        }

        const hasChildren = edges.some((edge) => edge.source === nodeId);

        if (hasChildren) {
          setShowSelectedMeal(false);
          bfsDeleteNodes(nodeId, edges, setNodes, setEdges);
        } else {
          if (nodeId === "explore") {
            const res = await fetchCategories();
            if (res.length === 0) {
              toast.error("No categories found.");
            }
            setCategories(res);
            handleSetCategories(res, setNodes, setEdges);
          } else if (nodeId.startsWith("category-")) {
            AddViewMealsNode(nodeId, "category", setNodes, setEdges, 400);
          } else if (nodeId.startsWith("viewmeal-category-")) {
            const cat = nodeId.split("-")[2];
            const res = await fetchMealsByCategory(cat);
            if (res.length === 0) {
              toast.error("No meals found for this category.");
            }
            setMeals(res);
            handleSetMeals(res, nodeId, setNodes, setEdges, 800);
          } else if (nodeId.startsWith("viewmeal-ingredient-")) {
            const nodeArr = nodeId.split("-");
            const ingredient = nodeArr[nodeArr.length - 1];
            const res = await fetchMealsByIngredient(ingredient);
            if (res.length === 0) {
              toast.error("No meals found for this ingredient.");
            }
            setMeals(res);
            handleSetMeals(res, nodeId, setNodes, setEdges, 2100);
          } else if (nodeId.startsWith("meal-")) {
            const mealArr = nodeId.split("-");
            const mealId = mealArr[mealArr.length - 1];
            const res = await fetchMealDetailsById(mealId);
            setSelectedMeal(res);
            createDetailNodesForMeal(nodeId, setNodes, setEdges, 1200);
          } else if (nodeId.startsWith("view-ingredients-")) {
            if (!selectedMeal) {
              toast.error("No meal selected to view ingredients.");
              return;
            }
            handleViewIngredients(
              nodeId,
              selectedMeal,
              setNodes,
              setEdges,
              2300
            );
          } else if (nodeId.startsWith("view-tags-")) {
            if (!selectedMeal || !selectedMeal.tags) {
              toast.error("No tags found for this meal.");
              return;
            }
            handleViewTags(nodeId, selectedMeal, setNodes, setEdges, 2100);
          } else if (nodeId.startsWith("view-details-")) {
            setShowSelectedMeal(!showSelectedMeal);
          } else if (nodeId.startsWith("ingredient-")) {
            AddViewMealsNode(nodeId, "ingredient", setNodes, setEdges, 1800);
          }
        }
      } catch (error) {
        toast.error("An error occurred while processing the node.");
      }
    },
    [
      categories,
      meals,
      selectedMeal,
      edges,
      nodes,
      setNodes,
      setEdges,
      showSelectedMeal,
    ]
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    selectedMeal,
    showSelectedMeal,
    setShowSelectedMeal,
  };
};
