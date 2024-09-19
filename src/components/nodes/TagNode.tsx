import React from "react";
import { FaTags } from "react-icons/fa";
import BaseNode from "../common/BaseNode";

const TagNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <BaseNode
    data={data}
    backgroundColor="#a855f7"
    borderColor="#9333ea"
    Icon={FaTags}
    targetHandle
    IconBackground="bg-violet-600"
  />
);

export default TagNode;
