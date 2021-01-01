import React from "react";
import { useNodeStyles } from "../../utils/nodeStyle";
import colors from "../../utils/colors";
import "../../utils/flowRules.css";
import { connect } from "react-redux";
import "@carbon/charts/styles.css";
import ViewerContext from "../../ViewerContext";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { updateNodeData } from "../../reducer/nodeReducer";

const MarkdownNode = ({ data, setContent }) => {
  const classes = useNodeStyles({ color: colors.output });
  const viewerContext = React.useContext(ViewerContext);
  React.useEffect(() => {
    if (!viewerContext[data.id]) {
      viewerContext[data.id] = {
        id: data.id,
        gridData: { x: 0, y: 0, w: 4, h: 2 },
        renderComponent: <MDEditor.Markdown source={data.content} />,
      };
    }
  }, []);
  React.useEffect(() => {
    viewerContext[data.id].renderComponent = (
      <MDEditor.Markdown source={data.content} />
    );
  }, [data.content]);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        <MDEditor
          value={data.content}
          onChange={setContent}
          preview="edit"
          commands={[
            commands.bold,
            commands.italic,
            commands.strikethrough,
            commands.divider,
            commands.title,
            commands.hr,
            commands.quote,
            commands.divider,
            commands.link,
            commands.code,
            commands.image,
            commands.divider,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.checkedListCommand,
          ]}
          className="nodrag"
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setContent: (v) =>
      dispatch(updateNodeData({ id: ownProps.id, data: { content: v } })),
  };
};

export default connect(null, mapDispatchToProps)(MarkdownNode);
