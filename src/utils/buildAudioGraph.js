import { Graph } from "./Graph";
import * as Tone from "tone";

export const connectSignals = (context, edge) => {
  try {
    context[edge.source][edge.sourceHandle].connect(
      context[edge.target][edge.targetHandle]
    );
  } catch (e) {
    if (e instanceof TypeError) {
      console.log(context, edge);
    }
    throw e;
  }
};

export const disconnectSignals = (context, edge) => {
  context[edge.source][edge.sourceHandle].disconnect(
    context[edge.target][edge.targetHandle]
  ); // this disconnects edge.source from everything :( so we have to reconnect that somehow?
};

export const removeFromAudioContext = (context, element) => {
  for (var el in context[element]) {
    try {
      if (context[element][el] instanceof Tone.ToneAudioNode) {
        context[element][el].dispose();
      } else {
        delete context[element][el];
      }
    } catch (e) {
      if (e instanceof TypeError) {
        console.log(context, element, e);
      }
      throw e;
    }
  }
};

export const removeFromContext = (context, element) => {
  // remove from ctx view
  context[element] = undefined;
  delete context[element];
};

export const buildAudioGraph = (ctx, nodes, edges) => {
  var nodeGraph = new Graph(nodes, edges);
  if (nodeGraph.isDag()) {
    var sortedNodes = nodeGraph.getSortedByDeparture();
    for (var node in sortedNodes) {
      var incomingEdges = edges.filter((v) => v.target === sortedNodes[node]);
      for (var edge in incomingEdges) {
        connectSignals(ctx, incomingEdges[edge]);
      }
    }
  } else {
    alert("Can't build the project audio-graph as it contains circular edges!");
  }
};
