import React from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import BaseNode from "../common/BaseNode";

const MealNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <BaseNode
    data={data}
    backgroundColor="#16a34a"
    borderColor="#15803d"
    Icon={GiForkKnifeSpoon}
    sourceHandle
    targetHandle
  />
);

export default MealNode;
