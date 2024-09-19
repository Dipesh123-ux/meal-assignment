import React from "react";
import { FiSearch } from "react-icons/fi";
import BaseNode from "../common/BaseNode";

const ExploreNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <BaseNode
    data={data}
    backgroundColor="#fffff"
    borderColor="#ffffff"
    Icon={FiSearch}
    sourceHandle
    IconBackground="bg-gray-400"
  />
);

export default ExploreNode;
