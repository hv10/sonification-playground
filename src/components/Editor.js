import React from "react";
import { createUseStyles } from "react-jss";
import { TestColorPicker, SynthNode, GraphNode, AudioOutNode } from "./nodes/";

import ReactFlow, {
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";
import Measure from "react-measure";
const initialElements = [
  {
    id: "1",
    type: "input",
    sourcePosition: "right",
    data: {
      label: <>Input</>,
    },
    position: { x: 50, y: 100 },
  },
  {
    id: "3",
    targetPosition: "left",
    sourcePosition: "right",
    type: "audioOut",
    data: {
      label: "Audio Label 1",
      onMuteToggle: (e) => {
        console.log(e);
      },
    },
    position: { x: 100, y: 250 },
  },
  {
    id: "5",
    targetPosition: "left",
    sourcePosition: "right",
    type: "graphNode",
    data: {
      label: "Graph Label 1",
      onChange: (event) => {
        console.log(event.target.value);
      },
    },
    position: { x: 150, y: 300 },
  },
  {
    id: "4",
    targetPosition: "left",
    sourcePosition: "right",
    type: "synthNode",
    data: {
      label: "Synth Label 1",
      onChange: (event) => {
        console.log(event.target.value);
      },
    },
    position: { x: 50, y: 200 },
  },
  {
    id: "7",
    targetPosition: "left",
    type: "output",
    data: { label: "Output" },
    position: { x: 400, y: 100 },
  },
  {
    id: "e1-7",
    source: "1",
    target: "7",
    style: { stroke: "#f6ab6c" },
    label: "audio",
    animated: true,
    labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
  },
];

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const nodeTypes = {
  testColorPicker: TestColorPicker,
  synthNode: SynthNode,
  graphNode: GraphNode,
  audioOut: AudioOutNode,
};

const Editor = ({ width = 1280, height = 720 }) => {
  const [elements, setElements] = React.useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onConnect = (params) =>
    setElements((els) => addEdge({ ...params, type: "smoothstep" }, els));
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      <ReactFlow
        elements={elements}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onLoad={onLoad}
        snapToGrid={true}
        snapGrid={[15, 15]}
        nodeTypes={nodeTypes}
        connectionLineType="smoothstep"
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === "input") return "#0041d0";
            if (n.type === "output") return "#ff0072";
            if (n.type === "default") return "#1a192b";
            return "#eee";
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;
            return "white";
          }}
          nodeBorderRadius={2}
        />
        <Controls />
        <Background color="#aaa" gap={40} size={1.5} />
      </ReactFlow>
    </div>
  );
};
export default Editor;
