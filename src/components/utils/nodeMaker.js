export const nodeMaker = (type, data = {}) => {
  const now = new Date().toString();
  if (!data.label) {
    data.label = "Node " + type;
  }
  return {
    type: type,
    position: { x: 0, y: 0 },
    sourcePosition: "right",
    targetPosition: "left",
    data: data,
    id: now,
  };
};

export default nodeMaker;
