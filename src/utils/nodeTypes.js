import {
  SynthNode,
  GraphNode,
  AudioOutNode,
  CSVInputNode,
  MathNode,
  ValueNode,
  KnobNode,
  PeakDetectorNode,
  MarkdownNode,
  ValueDisplayNode,
  SpatialOutNode,
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
  markdownNode: MarkdownNode,
  valueDisplay: ValueDisplayNode,
  spatialOutNode: SpatialOutNode,
};

export const nodeDescriptions = {
  synthNode:
    "Outputs a constant tone of {waveform} with {frequency} if {trigger}>0",
  graphNode: "",
  csvInput:
    "Allows loading a CSV-File where each column is a connectable source.",
  mathNode: "Diverse mathematical operations on the {input}s.",
  valueNode: "Outputs a constant {signal}.",
  knobNode: "Outputs a interactable {signal} in [0,1] (inclusive)",
  peakDetectorNode: "Outputs a 1,0,-1 depending on the {input}-signal.",
  markdownNode: "For note taking. Supports most of markdown.",
  valueDisplay: "Shows a value in sync with the input-{signal}",
  spatialOutNode: (
    <span>
      Outputs the audio in a spatial manner. <br />
      <strong>Note:</strong> using HRTF is more precise but computationally{" "}
      <em>very expensive</em>.
    </span>
  ),
};

export const nodeInOut = {
  synthNode: "2-1",
  graphNode: "1-0",
  csvInput: "0-n",
  audioOut: "1-0",
  mathNode: "[1,2]-1",
  valueNode: "0-1",
  knobNode: "0-1",
  peakDetectorNode: "3-1",
  markdownNode: "0-0",
  valueDisplay: "1-0",
  spatialOutNode: "1-0",
};
