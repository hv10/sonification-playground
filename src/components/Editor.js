import React from "react";
import { createUseStyles } from "react-jss";
import {
  TestColorPicker,
  SynthNode,
  GraphNode,
  AudioOutNode,
  CSVInputNode,
} from "./nodes/";
import colors from "../constants/colors";

import ReactFlow, {
  removeElements,
  addEdge,
  updateEdge,
  MiniMap,
  Controls,
  Background,
} from "react-flow-renderer";
import Measure from "react-measure";
const initialElements = [
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
    position: { x: 0, y: 200 },
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
    position: { x: 150, y: 200 },
  },
  {
    id: "8",
    targetPosition: "left",
    sourcePosition: "right",
    type: "csvInput",
    data: {
      label: "CSV Label 1",
      onChange: (event) => {
        console.log(event.target.value);
      },
    },
    position: { x: 300, y: 200 },
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
    position: { x: 450, y: 200 },
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
  csvInput: CSVInputNode,
};

const Editor = ({ width = 1280, height = 720 }) => {
  const [elements, setElements] = React.useState(initialElements);
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));
  const onConnect = (params) => {
    console.log(params);
    let updatedParams = {};
    if (
      params.sourceHandle.startsWith("audio-") &&
      params.targetHandle.startsWith("audio-")
    ) {
      updatedParams = {
        label: "audio",
        style: { stroke: colors.audio },
        animated: true,
      };
    } else if (
      params.sourceHandle.startsWith("audio-") &&
      params.targetHandle.startsWith("value-")
    ) {
      updatedParams = { label: "audio→value" };
    } else {
      updatedParams = { label: "value" };
    }
    setElements((els) =>
      addEdge({ ...params, type: "smoothstep", ...updatedParams }, els)
    );
  };
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
        onEdgeUpdate={onEdgeUpdate}
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
