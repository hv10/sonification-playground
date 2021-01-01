import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import * as Tone from "tone";
import {
  Button,
  NumberInput,
  Dropdown,
  FileUploader,
  Toggle,
  Checkbox,
  TooltipIcon,
  Accordion,
  AccordionItem,
  ButtonSet,
} from "carbon-components-react";
import { Close16, Close32 } from "@carbon/icons-react";
import { useNodeStyles } from "../../utils/nodeStyle";
import colors from "../../utils/colors";
import { LabeledHandle, NameTypeLabel } from "../LabeledHandle";
import "../../utils/flowRules.css";
import * as Papa from "papaparse";
import { StereoXFeedbackEffect } from "tone/build/esm/effect/StereoXFeedbackEffect";
import { removeConnectedEdges } from "../../reducer/edgeReducer";
import { ToneJSContext } from "../../ToneJSContext";
import { updateNodeData } from "../../reducer/nodeReducer";
import { connect } from "react-redux";

const CSVInputNode = ({
  data,
  setCSVData,
  setCSVMeta,
  setLinesPerSecond,
  setDataReady,
  removeConnectedEdges,
}) => {
  const classes = useNodeStyles({ color: colors.input });
  const [hasHeader, setHasHeader] = React.useState(false);
  const toneJSContext = React.useContext(ToneJSContext);
  const clearData = () => {
    setDataReady(false);
    removeConnectedEdges();
    setCSVData([]);
    setCSVMeta({});
  };
  const updateColumnSignals = (column) => {
    toneJSContext[data.id][column].cancelScheduledValues(0);
    for (var i = 1; i < data.csvData.length; i++) {
      toneJSContext[data.id][column].setValueAtTime(
        +data.csvData[i][column] || 0,
        i / data.linesPerSecond
      );
    }
  };
  const handleCSVUpload = (evt) => {
    setCSVData([]);
    const file = evt.target.files[0];
    console.log("CSVFILE:", file.name);
    Papa.parse(file, {
      worker: true,
      skipEmptyLines: true,
      header: hasHeader,
      complete: (props) => {
        console.log("LOADED CSV", file.name, props);
        if (!props.data.length > 0) {
          alert("Can not load empty CSV File");
          return;
        }
        setCSVData(props.data);
        if (!props.meta.fields) {
          props.meta.fields = props.data[0].map((v, i) => i.toString());
        }
        setCSVMeta({ ...props.meta, name: file.name });
        setDataReady(true);
      },
    });
  };
  React.useEffect(() => {
    if (data.dataReady) {
      console.log("Data changed updating Signals...");
      toneJSContext[data.id] = {};
      for (var column in data.csvMeta.fields) {
        toneJSContext[data.id][
          data.csvMeta.fields[column]
        ] = new Tone.SyncedSignal(
          +data.csvData[0][data.csvMeta.fields[column]] || 0,
          "number"
        );
        updateColumnSignals(data.csvMeta.fields[column]);
      }
    }
  }, [data.id, data.dataReady]);
  React.useEffect(() => {
    for (var column in data.csvMeta.fields) {
      updateColumnSignals(data.csvMeta.fields[column]);
    }
  }, [data.linesPerSecond]);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        {data.dataReady ? (
          <Accordion>
            <AccordionItem title={data.csvMeta.name} style={{ width: 250 }}>
              <p>
                <h5>Columns</h5>
                {data.csvMeta.fields.map((v) => (
                  <span>{v},</span>
                ))}
              </p>
              <br />
              <Button
                kind="secondary"
                onClick={clearData}
                renderIcon={Close16}
                size="small"
              >
                Clear Data
              </Button>
            </AccordionItem>
            <AccordionItem title="Settings">
              <NumberInput
                label="lines/s"
                className="nodrag"
                value={data.linesPerSecond}
                onChange={(e) => setLinesPerSecond(e.imaginaryTarget.value)}
              />
            </AccordionItem>
          </Accordion>
        ) : (
          <>
            <FileUploader
              accept={["text/csv"]}
              labelTitle="Data Upload"
              labelDescription="Accepts only .csv"
              buttonLabel="Select .csv"
              onChange={handleCSVUpload}
            />
            <Toggle
              labelText="CSV includes header"
              toggled={hasHeader}
              onChange={() => setHasHeader(!hasHeader)}
              className="nodrag"
            />
          </>
        )}
      </div>
      {data.dataReady ? (
        <>
          {data.csvMeta.fields.map((v, i) => (
            <LabeledHandle
              type="source"
              position="right"
              id={v}
              key={`value-field-${v}-out`}
              label={NameTypeLabel(v, "value")}
              className={classes.handle}
              style={{
                top: `${15 + i * (85 / data.csvMeta.fields.length)}%`,
              }}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCSVData: (csvData) =>
      dispatch(updateNodeData({ id: ownProps.id, data: { csvData: csvData } })),
    setCSVMeta: (csvMeta) =>
      dispatch(updateNodeData({ id: ownProps.id, data: { csvMeta: csvMeta } })),
    setLinesPerSecond: (lps) =>
      dispatch(
        updateNodeData({ id: ownProps.id, data: { linesPerSecond: lps } })
      ),
    setDataReady: (b) =>
      dispatch(updateNodeData({ id: ownProps.id, data: { dataReady: b } })),
    removeConnectedEdges: () => dispatch(removeConnectedEdges(ownProps.id)),
  };
};

export default connect(null, mapDispatchToProps)(CSVInputNode);
