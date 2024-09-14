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
          clearSiblingNodes(nodeId, edges, nodes, setNodes, setEdges);
        }

        const hasChildren = edges.some((edge) => edge.source === nodeId);

        if (hasChildren) {
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
            AddViewMealsNode(nodeId, setNodes, setEdges);
          } else if (nodeId.startsWith("viewmeal-")) {
            const cat = nodeId.split("-")[2];
            const res = await fetchMealsByCategory(cat);
            if (res.length === 0) {
              toast.error("No meals found for this category.");
            }
            setMeals(res);
            handleSetMeals(res, nodeId, setNodes, setEdges);
          } else if (nodeId.startsWith("meal-")) {
            const mealId = nodeId.split("-")[1];
            const res = await fetchMealDetailsById(mealId);
            setSelectedMeal(res);
            createDetailNodesForMeal(mealId, setNodes, setEdges);
          } else if (nodeId.startsWith("view-ingredients-")) {
            const mealId = nodeId.split("-")[2];
            if (!selectedMeal) {
              toast.error("No meal selected to view ingredients.");
              return;
            }
            handleViewIngredients(mealId, selectedMeal, setNodes, setEdges);
          } else if (nodeId.startsWith("view-tags-")) {
            const mealId = nodeId.split("-")[2];
            if (!selectedMeal || !selectedMeal.tags) {
              toast.error("No tags found for this meal.");
              return;
            }
            handleViewTags(mealId, selectedMeal, setNodes, setEdges);
          } else if (nodeId.startsWith("view-details-")) {
            setShowSelectedMeal(!showSelectedMeal);
          }
        }
      } catch (error) {
        toast.error("An error occurred while processing the node.");
      }
    },
    [categories, meals, selectedMeal, edges, nodes, setNodes, setEdges, showSelectedMeal]
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
