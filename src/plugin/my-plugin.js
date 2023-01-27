const editOnGitPlugin = (props = { repoUrl }) => (hook, vm) =>
    hook.beforeEach((html) => {
      let editUrl = props.repoUrl + vm.route.file;
      let editLinkMarkdown = "[📝 Edit on Github](" + editUrl + ")\n";

      return editLinkMarkdown + html;
});

const customFooterPlugin = (props = { title, link }) => (hook) =>
    hook.afterEach((html) => {
      let footer = [
        "<hr/>",
        "<footer>",
        `<span>${props.title}</span>`,
        `<span><a href="${props.link}" target="_blank">✨</a></span>`,
        "</footer>",
      ].join("");

      return html + footer;
});

export { editOnGitPlugin, customFooterPlugin };
