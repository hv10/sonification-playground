import { Graph } from "./Graph";

export const connectSignals = (context, edge) => {
  console.log(context, edge);
  context[edge.source][edge.sourceHandle].connect(
    context[edge.target][edge.targetHandle]
  );
};

export const disconnectSignals = (context, edge) => {
  console.log(context, edge);
  context[edge.source][edge.sourceHandle].disconnect(
    context[edge.target][edge.targetHandle]
  );
};

export const removeFromContext = (context, element) => {
  context[element] = undefined;
  delete context[element];
};

export const buildAudioGraph = (ctx, nodes, edges) => {
  var nodeGraph = new Graph(nodes, edges);
  if (nodeGraph.isDag()) {
    var sortedNodes = nodeGraph.getSortedByDeparture();
    for (var node in sortedNodes) {
      var incomingEdges = edges.filter((v) => v.target === sortedNodes[node]);
      console.log("incoming", incomingEdges);
      for (var edge in incomingEdges) {
        connectSignals(ctx, incomingEdges[edge]);
      }
    }
  } else {
    alert("Can't build the project audio-graph as it contains circular edges!");
  }
};
