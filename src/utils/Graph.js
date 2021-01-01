export class Graph {
  constructor(nodes, edges) {
    this.nodes = {};
    this.adjList = {};
    nodes.forEach((node) => {
      this.adjList[node.id] = {};
      this.nodes[node.id] = {};
    });
    edges.forEach((edge) => {
      this.adjList[edge.source][edge.target] = true;
    });
  }
  dfs_from(v, time) {
    this.nodes[v].discovered = true;
    this.nodes[v].departure = time;
    // for each undiscovered node call dfs
    for (var node in this.adjList[v]) {
      if (!this.nodes[node].discovered) {
        this.dfs_from(node, time + 1);
      }
    }
  }
  dfs() {
    var time = 0;
    // start DFS from each (undiscovered) node
    for (var node in this.nodes) {
      if (!this.nodes[node].discovered) {
        this.dfs_from(node, time);
      }
    }
  }
  isDag() {
    // ensure dfs
    this.dfs();
    // check for each edge if it is a backedge
    for (var s in this.nodes) {
      for (var t in this.adjList[s]) {
        if (this.nodes[s].departure > this.nodes[t].departure) {
          return false;
        }
      }
    }
    return true;
  }
  getSortedByDeparture() {
    this.dfs();
    var temp = Object.entries(this.nodes)
      .sort((a, b) => a[1].departure < b[1].departure)
      .map((v) => v[0]);
    return temp;
  }
}

export default Graph;

export const isDag = (nodes, edges) => {
  var graph = new Graph(nodes, edges);
  return graph.isDag();
};
