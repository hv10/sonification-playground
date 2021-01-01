import {
  SynthNode,
  GraphNode,
  AudioOutNode,
  CSVInputNode,
  MathNode,
  ValueNode,
  KnobNode,
  PeakDetectorNode,
} from "../components/nodes";

export const nodeTypes = {
  synthNode: SynthNode,
  graphNode: GraphNode,
  audioOut: AudioOutNode,
  csvInput: CSVInputNode,
  mathNode: MathNode,
  valueNode: ValueNode,
  knobNode: KnobNode,
  peakDetectorNode: PeakDetectorNode,
};
