import React from "react";
import { GiCarrot } from "react-icons/gi";
import BaseNode from "../common/BaseNode";

const IngredientNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <BaseNode
    data={data}
    backgroundColor="#eab308" // Yellow color
    borderColor="#ca8a04"
    Icon={GiCarrot}
    targetHandle
    sourceHandle
    IconBackground="bg-violet-600"

  />
);

export default IngredientNode;
