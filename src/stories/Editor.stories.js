import React from "react";
import Editor from "../components/Editor";

export default {
  title: "Editor",
  component: Editor,
};

const Template = (args) => <Editor {...args} />;

export const Primary = Template.bind({});
