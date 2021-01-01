export const buildAudioGraph = () => {};

export const connectSignals = (context, edge) => {
  context[edge.source][edge.sourceHandle].connect(
    context[edge.target][edge.targetHandle]
  );
};

export const disconnectSignals = (context, edge) => {
  context[edge.source][edge.sourceHandle].disconnect(
    context[edge.target][edge.targetHandle]
  );
};

export const removeFromContext = (context, element) => {
  context[element] = undefined;
  delete context[element];
};
