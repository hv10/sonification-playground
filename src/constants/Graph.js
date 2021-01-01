class Graph {
  constructor(nodes, edges) {
    console.log("Graph Inp", nodes, edges);
    this.nodes = {};
    this.adjList = {};
    nodes.forEach((node) => {
      this.adjList[node.id] = {};
      this.nodes[node.id] = {};
    });
    edges.forEach((edge) => {
      this.adjList[edge.source][edge.target] = true;
    });
    console.log("DBG Graph:", this.nodes, this.adjList);
  }
  dfs(v, time) {
    this.nodes[v].discovered = true;
    this.nodes[v].departure = time;
    // for each undiscovered node call dfs
    for (var node in this.adjList[v]) {
      if (!this.nodes[node].discovered) {
        this.dfs(node, time + 1);
      }
    }
  }
  isDag() {
    var time = 0;
    // start DFS from each (undiscovered) node
    for (var node in this.nodes) {
      if (!this.nodes[node].discovered) {
        this.dfs(node, time);
      }
    }
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
}

export default Graph;

export const isDag = (nodes, edges) => {
  var graph = new Graph(nodes, edges);
  return graph.isDag();
};
