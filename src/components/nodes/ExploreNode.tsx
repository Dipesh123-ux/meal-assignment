import React from "react";
import { FiSearch } from "react-icons/fi";
import BaseNode from "../common/BaseNode";

const ExploreNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <BaseNode
    data={data}
    backgroundColor="#f97316"
    borderColor="#ea580c"
    Icon={FiSearch}
    sourceHandle
  />
);

export default ExploreNode;
