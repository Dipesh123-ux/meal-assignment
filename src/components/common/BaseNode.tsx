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
}

const BaseNode: React.FC<BaseNodeProps> = ({
  data,
  backgroundColor,
  borderColor,
  Icon,
  sourceHandle,
  targetHandle,
}) => (
  <div
    className={`flex items-center px-4 py-3 shadow-lg rounded-md text-white`}
    style={{
      backgroundColor,
      border: `2px solid ${borderColor}`,
    }}
  >
    {targetHandle && <Handle type="target" position={Position.Left} />}
    <Icon className="mr-2 text-xl" />
    <div className="flex-grow font-semibold">{data.label}</div>
    {sourceHandle && <Handle type="source" position={Position.Right} />}
  </div>
);

export default BaseNode;
