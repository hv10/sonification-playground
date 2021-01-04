import { isDag, Graph } from "./Graph";
const isValidConnection = (nodes, edges, edge) => {
  var graph = new Graph(nodes, [...edges, edge]);
  if (graph.isDag) {
    return true;
  }
  return false;
};

export default isValidConnection;
