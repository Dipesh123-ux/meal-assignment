import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import ExploreNode from "../nodes/ExploreNode";
import CategoryNode from "../nodes/CategoryNode";
import TagNode from "../nodes/TagNode";
import IngredientNode from "../nodes/IngredientNode";
import MealNode from "../nodes/MealNode";
import MealDetailsSidebar from "../common/MealDetailsSidebar";
import { useFoodGraph } from "../../hooks/useFoodGraph";
import ViewNode from "../nodes/ViewNode";

const nodeTypes = {
  exploreNode: ExploreNode,
  categoryNode: CategoryNode,
  mealNode: MealNode,
  ingredientNode: IngredientNode,
  tagNode: TagNode,
  viewNode: ViewNode,
};

const FoodExplorer: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    selectedMeal,
    showSelectedMeal,
    setShowSelectedMeal,
  } = useFoodGraph();

  return (
    <div className="h-screen w-full">
      <div className="h-12 flex items-center shadow-lg">
        <p className="text-lg font-medium text-gray-700 ms-4">Food Explorer</p>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      <MealDetailsSidebar
        meal={selectedMeal}
        showSelectedMeal={showSelectedMeal}
        setShowSelectedMeal={setShowSelectedMeal}
      />
    </div>
  );
};

export default FoodExplorer;
