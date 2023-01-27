import { editOnGitPlugin, customFooterPlugin } from "./my-plugin";

const docsify = window.$docsify || {};

const props =
  {
    editOnGitPlugin: docsify.editOnGitPlugin,
    customFooterPlugin: docsify.customFooterPlugin,
  } || {};

docsify.plugins = [].concat(
  docsify.plugins || [],
  editOnGitPlugin(props.editOnGitPlugin),
  customFooterPlugin(props.customFooterPlugin)
);
