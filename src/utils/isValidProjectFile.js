const minimalProj = {
  nodes: [],
  edges: [],
};
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

export const isValidProjectFile = (json) => {
  if (
    !arraysEqual(
      Object.keys(minimalProj).sort(),
      Object.keys(json)
        .filter((v) => !v.startsWith("_"))
        .sort()
    )
  ) {
    return false;
  }
  return true;
};
export default isValidProjectFile;
