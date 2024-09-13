import React from "react";
import { AiOutlineAppstore } from "react-icons/ai";
import BaseNode from "../common/BaseNode";

const CategoryNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <BaseNode
    data={data}
    backgroundColor="#3b82f6"
    borderColor="#1e40af"
    Icon={AiOutlineAppstore}
    sourceHandle
    targetHandle
  />
);

export default CategoryNode;
