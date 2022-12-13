import myPlugin from "./my-plugin";

const docsify = window.$docsify || {};

// Remove if you don't use props
const props = docsify.myPlugin || {};

docsify.plugins = [].concat(docsify.plugins || [], myPlugin(props));
