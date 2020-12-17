import React from "react";
import { createUseStyles } from "react-jss";
import { nodeTypes } from "../constants/nodeTypes";
import colors from "../constants/colors";

import ReactFlow, { MiniMap, Controls, Background } from "react-flow-renderer";
import Measure from "react-measure";
import { connect } from "react-redux";
import { addEdge, removeEdge } from "../reducer/edgeReducer";
import { removeNode } from "../reducer/nodeReducer";

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const Editor = ({
  width = 1280,
  height = 720,
  nodes,
  edges,
  addEdge,
  removeEdge,
  removeNode,
}) => {
  const onElementsRemove = (elementsToRemove) => {
    console.log("onElementsRemove", elementsToRemove);
    for (var element in elementsToRemove) {
      if (elementsToRemove[element].type === "smoothstep") {
        removeEdge(elementsToRemove[element].id);
      } else {
        removeNode(elementsToRemove[element].id);
      }
    }
  };
  /*const onEdgeUpdate = (oldEdge, newConnection) =>
    setElements((els) => updateEdge(oldEdge, newConnection, els));*/
  const onConnect = (params) => {
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
    const edge = {
      ...params,
      type: "smoothstep",
      id:
        "edge__" +
        params.source +
        params.sourceHandle +
        "_" +
        params.target +
        params.targetHandle,
      ...updatedParams,
    };
    addEdge(edge);
  };
  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      <ReactFlow
        elements={[...edges, ...nodes]}
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
            if (n.type === "input") return colors.input;
            if (n.type === "output") return colors.output;
            if (n.type === "default") return colors.nodeDefault;
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
const mapStateToProps = (state) => {
  return { nodes: state.nodes, edges: state.edges };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addEdge: (edge) => dispatch(addEdge(edge)),
    removeEdge: (id) => dispatch(removeEdge(id)),
    removeNode: (id) => dispatch(removeNode(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
