import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
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

const CSVInputNode = memo(({ data }) => {
  const classes = useNodeStyles({ color: colors.input });
  const [csvData, setCSVData] = React.useState([]);
  const [dataReady, setDataReady] = React.useState(false);
  const [hasHeader, setHasHeader] = React.useState(true);
  const [csvMeta, setCSVMeta] = React.useState({});
  const clearData = () => {
    setCSVData([]);
    console.log(csvMeta);
    setDataReady(false);
  };
  const handleCSVUpload = (evt) => {
    setCSVData([]);
    const file = evt.target.files[0];
    setCSVMeta(() => ({ name: file.name }));
    console.log("CSVFILE:", file.name);
    Papa.parse(file, {
      worker: true,
      skipEmptyLines: true,
      header: hasHeader,
      step: (r) => {
        setCSVData([...csvData, r.data]);
        setCSVMeta({ ...csvMeta, ...r.meta });
      },
      complete: () => {
        setDataReady(true);
      },
    });
  };
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      {dataReady ? (
        <div className={classes.content}>
          <Accordion>
            <AccordionItem title={csvMeta.name} style={{ width: 250 }}>
              <Button
                kind="secondary"
                onClick={clearData}
                renderIcon={Close16}
                size="small"
              >
                Clear Data
              </Button>
            </AccordionItem>
          </Accordion>
        </div>
      ) : (
        <div className={classes.content}>
          <FileUploader
            accept={["text/csv"]}
            labelTitle="Data Upload"
            labelDescription="Accepts only .csv"
            buttonLabel="Select .csv"
            onChange={handleCSVUpload}
          />
          <Checkbox
            labelText="CSV includes header"
            checked={hasHeader}
            onClick={setHasHeader}
          />
        </div>
      )}
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
});

export default CSVInputNode;
