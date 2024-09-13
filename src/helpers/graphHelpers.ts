import { Node, Edge } from "reactflow";

export const bfsDeleteNodes = (
  startNodeId: string,
  edges: Edge[],
  setNodes: Function,
  setEdges: Function
) => {
  const queue: string[] = [startNodeId];
  const nodesToDelete: Set<string> = new Set();
  const edgesToDelete: Set<string> = new Set();

  while (queue.length > 0) {
    const currentNodeId = queue.shift()!;

    edges.forEach((edge) => {
      if (edge.source === currentNodeId) {
        edgesToDelete.add(edge.id);
        queue.push(edge.target);
        nodesToDelete.add(edge.target);
      }
    });
  }

  setNodes((nds: Node[]) => nds.filter((node) => !nodesToDelete.has(node.id)));
  setEdges((eds: Edge[]) => eds.filter((edge) => !edgesToDelete.has(edge.id)));
};

export const getNodeLevel = (nodeId: string): number => {
  if (nodeId === "explore") return 0;
  if (nodeId.startsWith("category-")) return 1;
  if (nodeId.startsWith("viewmeal-")) return 2;
  if (nodeId.startsWith("meal-")) return 3;
  if (nodeId.startsWith("view-")) return 4;
  return -1;
};

export const clearSiblingNodes = (
  nodeId: string,
  edges: Edge[],
  nodes: Node[],
  setNodes: Function,
  setEdges: Function
) => {
  const level = getNodeLevel(nodeId);
  const parentEdge = edges.find((edge) => edge.target === nodeId);

  if (parentEdge) {
    const parentId = parentEdge.source;
    edges.forEach((edge) => {
      if (edge.source === parentId && edge.target !== nodeId) {
        bfsDeleteNodes(edge.target, edges, setNodes, setEdges);
      }
    });
  } else if (level === 1) {
    nodes.forEach((node) => {
      if (node.id.startsWith("category-") && node.id !== nodeId) {
        bfsDeleteNodes(node.id, edges, setNodes, setEdges);
      }
    });
  }
};
