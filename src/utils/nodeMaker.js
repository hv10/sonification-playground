export const nodeMaker = (params) => {
  const now = params.id || new Date().getTime().toString();
  const data = params.data || {};
  const type = params.type || "unset";
  if (!data.label) {
    data.label = "" + now.slice(-5) + "(" + type + ")";
  }
  if (type === "mathNode") {
    data.operation = "add";
  }
  if (type === "valueNode" || type === "knobNode") {
    data.value = 1;
  }
  if (type === "peakDetectorNode") {
    data.lag = 5;
    data.threshold = 3.5;
    data.influence = 0;
  }
  if (type === "csvInput") {
    data.csvData = [];
    data.csvMeta = {};
    data.linesPerSecond = 2;
    data.dataReady = false;
  }
  if (type === "markdownNode") {
    data.content = "";
  }
  if (type === "spatialOutNode") {
    data.positionX = 0;
    data.positionY = 0.5;
    data.panningModel = "equalpower";
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
