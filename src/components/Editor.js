import React from "react";
import { createUseStyles } from "react-jss";
import { nodeTypes } from "../constants/nodeTypes";
import colors from "../constants/colors";

import ReactFlow, { MiniMap, Controls, Background } from "react-flow-renderer";
import Measure from "react-measure";
import { connect } from "react-redux";
import { addEdge, removeEdge } from "../reducer/edgeReducer";
import { removeNode, updateNode } from "../reducer/nodeReducer";
import ToneJSContext from "../ToneJSContext";
import ViewerContext from "../ViewerContext";
import { isDag } from "../constants/Graph";

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const connectSignals = (context, edge) => {
  console.log(edge);
  console.log("Source", context[edge.source], edge.sourceHandle);
  console.log("Target", context[edge.target], edge.targetHandle);
  context[edge.source][edge.sourceHandle].connect(
    context[edge.target][edge.targetHandle]
  );
};

const disconnectSignals = (context, edge) => {
  context[edge.source][edge.sourceHandle].disconnect(
    context[edge.target][edge.targetHandle]
  );
};

const removeFromContext = (context, element) => {
  context[element] = undefined;
  delete context[element];
};

const Editor = ({
  width = 1280,
  height = 720,
  nodes,
  edges,
  addEdge,
  removeEdge,
  removeNode,
  updateNodePosition,
}) => {
  const toneJSContext = React.useContext(ToneJSContext);
  const viewerContext = React.useContext(ViewerContext);
  const onNodeMove = (event, node) => {
    console.log("updatePosition");
    console.log(node);
    updateNodePosition(node.id, node.position);
  };
  const onElementsRemove = (elementsToRemove) => {
    console.log("onElementsRemove", elementsToRemove);
    const edgeIdentifier = "smoothstep";
    elementsToRemove.sort((a, b) => {
      if (a.type === edgeIdentifier && b.type !== edgeIdentifier) {
        return -1;
      } else if (a.type !== edgeIdentifier && b.type === edgeIdentifier) {
        return 1;
      } else {
        return 0;
      }
    }); // we need to remove edges first!
    for (var element in elementsToRemove) {
      if (elementsToRemove[element].type === edgeIdentifier) {
        removeEdge(elementsToRemove[element].id);
        disconnectSignals(toneJSContext, elementsToRemove[element]);
      } else {
        removeNode(elementsToRemove[element].id);
        removeFromContext(toneJSContext, elementsToRemove[element].id);
        removeFromContext(viewerContext, elementsToRemove[element].id);
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
      data: { hello: "there general kenobi" },
      ...updatedParams,
    };
    if (isDag(nodes, [...edges, edge])) {
      addEdge(edge);
      connectSignals(toneJSContext, edge);
    } else {
      alert("Creating Cycles is not supported!");
    }
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
        onNodeDragStop={onNodeMove}
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
    updateNodePosition: (id, newPos) =>
      dispatch(updateNode({ id: id, data: { position: newPos } })),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Editor);
