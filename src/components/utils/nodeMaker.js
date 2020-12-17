export const nodeMaker = (type, data = {}) => {
  const now = new Date().getTime().toString();
  if (!data.label) {
    data.label = "Node " + type;
  }
  if (type === "graphNode") {
    if (!data.dataViewId) {
      data.dataViewId = now;
    }
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
