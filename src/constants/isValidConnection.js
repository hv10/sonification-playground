import { isDag } from "./Graph";
const isValidConnection = (nodes, edges, params) => {
  if (isDag(nodes, [...edges, params])) {
    return true;
  }
  return false;
};

export default isValidConnection;
