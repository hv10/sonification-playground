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
    Object.keys(this.adjList[v]).forEach((u) => {
      if (!this.nodes[u].discovered) {
        time = this.dfs(u, time);
      }
    });
    this.nodes[v].departure = time;
    return time + 1;
  }
  isDag() {
    var time = 0;
    Object.keys(this.nodes).forEach((v) => {
      if (!this.nodes[v].discovered) {
        this.dfs(v, time);
      }
    });
    Object.keys(this.nodes).forEach((v) => {
      Object.keys(this.adjList[v]).forEach((u) => {
        if (this.nodes[v].departure <= this.nodes[u].departure) {
          return false;
        }
      });
    });
    return true;
  }
}

export default Graph;

export const isDag = (nodes, edges) => {
  var graph = new Graph(nodes, edges);
  return graph.isDag();
};
