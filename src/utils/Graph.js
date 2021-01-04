export class Graph {
  constructor(nodes, edges) {
    this.nodes = {};
    this.adjList = {};
    this._isDag = true;
    this.topoSort = [];
    nodes.forEach((node) => {
      this.adjList[node.id] = {};
      this.nodes[node.id] = {};
    });
    edges.forEach((edge) => {
      this.adjList[edge.source][edge.target] = true;
    });
    for (var node in this.nodes) {
      if (!this._isDag) {
        break;
      }
      if (!this.nodes[node].done) {
        this._visit(node);
      }
    }
  }
  _visit(n) {
    if (this.nodes[n].done) {
      return;
    }
    if (this.nodes[n].visited) {
      // not DAG
      this._isDag = false;
      return;
    }
    this.nodes[n].visited = true;
    for (var m in this.adjList[n]) {
      this._visit(m);
    }
    this.nodes[n].visited = false;
    this.nodes[n].done = true;
    this.topoSort = [n, ...this.topoSort];
  }
  get isDag() {
    return this._isDag;
  }
  getSortedByDeparture() {
    return this.topoSort;
  }
}

export default Graph;

export const isDag = (nodes, edges) => {
  var graph = new Graph(nodes, edges);
  return graph.isDag();
};
