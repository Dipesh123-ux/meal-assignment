import React from "react";
import { FaEye} from "react-icons/fa";
import BaseNode from "../common/BaseNode";

const ViewNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <BaseNode
    data={data}
    backgroundColor="#a855f7"
    borderColor="#9333ea"
    Icon={FaEye}
    targetHandle
    sourceHandle
  />
);

export default ViewNode;