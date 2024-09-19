import React from 'react';
import { Handle, Position } from 'reactflow';
import { IconType } from 'react-icons';

interface BaseNodeProps {
  data: { label: string };
  backgroundColor: string;
  borderColor: string;
  Icon: IconType;
  sourceHandle?: boolean;
  targetHandle?: boolean;
  IconBackground : string;
  nodeClass? : string;
}

const BaseNode: React.FC<BaseNodeProps> = ({
  data,
  Icon,
  sourceHandle,
  targetHandle,
  IconBackground,
  nodeClass
}) => (
  <div
    className={`flex items-center px-4 py-3 shadow-xl  rounded-md text-gray-500 ${nodeClass}`}
    style={{
      background : "white",
      border: `0.5px solid gray`,
    }}
  >
    {targetHandle && <Handle type="target" position={Position.Left} />}
    <Icon className={`mr-2 text-2xl text-white ${IconBackground} p-1 rounded`}/>
    <div className="flex-grow font-semibold">{data.label}</div>
    {sourceHandle && <Handle type="source" position={Position.Right} />}
  </div>
);

export default BaseNode;
