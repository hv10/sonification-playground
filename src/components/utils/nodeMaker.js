export const nodeMaker = (type, data = {}) => {
  const now = new Date().getTime().toString();
  if (!data.label) {
    data.label = "" + now.slice(-5) + "(" + type + ")";
  }
  if (type === "mathNode") {
    data.operation = "add";
  }
  if (type === "valueNode" || type === "knobNode") {
    data.value = 1;
  }
  return {
    type: type,
    position: { x: 0, y: 0 },
    sourcePosition: "right",
    targetPosition: "left",
    data: { ...data, id: now },
    id: now,
  };
};

export default nodeMaker;
