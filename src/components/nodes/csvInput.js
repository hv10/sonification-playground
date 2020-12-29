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
import { useNodeStyles } from "../../constants/nodeStyle";
import colors from "../../constants/colors";
import { LabeledHandle, NameTypeLabel } from "../LabeledHandle";
import "../../constants/flowRules.css";
import * as Papa from "papaparse";
import { StereoXFeedbackEffect } from "tone/build/esm/effect/StereoXFeedbackEffect";
import { removeEdge } from "../../reducer/edgeReducer";
import { ToneJSContext } from "../../ToneJSContext";

const CSVInputNode = ({ data }) => {
  const classes = useNodeStyles({ color: colors.input });
  const [csvData, setCSVData] = React.useState([]);
  const [dataReady, setDataReady] = React.useState(false);
  const [hasHeader, setHasHeader] = React.useState(false);
  const [csvMeta, setCSVMeta] = React.useState({});
  const [linesPerSecond, setLinesPerSecond] = React.useState(2);
  const toneJSContext = React.useContext(ToneJSContext);
  const clearData = () => {
    setCSVData([]);
    setDataReady(false);
  };
  const updateColumnSignals = (column) => {
    toneJSContext[data.id].columns[column].cancelScheduledValues();
    for (var i = 0; i < csvData.length; i++) {
      toneJSContext[data.id].columns[column].setValueAtTime(
        +csvData[i][column] || 0,
        i / linesPerSecond
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
        setCSVData(props.data);
        if (props.meta.fields === undefined) {
          props.meta.fields = [];
          for (var i = 0; i < props.data[0].length; i++) {
            props.meta.fields.push(i);
          }
        }
        setCSVMeta({ ...props.meta, name: file.name });
        setDataReady(true);
      },
    });
  };
  React.useEffect(() => {
    toneJSContext[data.id] = {
      columns: {},
    };
  }, []);
  React.useEffect(() => {
    console.log("Data changed updating Signals...");
    toneJSContext[data.id].columns = {};
    for (var column in csvMeta.fields) {
      console.log("Updating Column:", column, csvMeta.fields[column]);
      toneJSContext[data.id].columns[csvMeta.fields[column]] = new Tone.Signal(
        0
      );
      updateColumnSignals(csvMeta.fields[column]);
    }
  }, [csvData, csvMeta]);
  React.useEffect(() => {
    for (var column in csvMeta.fields) {
      updateColumnSignals(csvMeta.fields[column]);
    }
  }, [linesPerSecond]);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        {dataReady ? (
          <Accordion>
            <AccordionItem title={csvMeta.name} style={{ width: 250 }}>
              <p>
                <h5>Columns</h5>
                {csvMeta.fields.map((v) => (
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
                value={linesPerSecond}
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
      {dataReady ? (
        <>
          <LabeledHandle
            type="source"
            position="right"
            id="value-name-out"
            label={NameTypeLabel("name-out", "value")}
            style={{
              top: "5%",
            }}
            className={classes.handle}
          />
          {csvMeta.fields.map((v, i) => (
            <LabeledHandle
              type="source"
              position="right"
              id={`value-field-${v}-${i}-out`}
              key={`value-field-${v}-out`}
              label={NameTypeLabel(v, "value")}
              className={classes.handle}
              style={{
                top: `${15 + i * (85 / csvMeta.fields.length)}%`,
              }}
            />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default CSVInputNode;
