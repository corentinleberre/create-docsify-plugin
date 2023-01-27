# create-docsify-plugin

## Enhance your Docsify experience with your own plugin

Docsify is a popular and lightweight documentation generator that allows you to **easily create beautiful, intuitive documentation sites** based on your markdown documentations. It includes features like a search function, a table of contents, and the ability to customize the look and feel of the site using templates and custom CSS. Thanks to that it's a popular choice for open-source documentation sites and other purposes.

If you want to extend Docsify's features, you can use [community plugins](https://github.com/docsifyjs/awesome-docsify#plugins) or **create your own Docsify plugin**.

In this post I'll guide you to **create your first Docsify plugin** and deploy it to NPM.

> Requirements : Node 16

To simplify the process, I've made a preconfigured workspace. To use it just clone the repository below and use it as a starting point for your own plugin 👇

```bash
npx degit corentinleberre/create-docsify-plugin my-plugin
cd my-plugin
```

### Structure of the project

Here is the structure of this template. The code is stored in the **src** folder.

```text
📦create-docsify-plugin
┣ 📂src
┃ ┣ 📂plugin
┃ ┃ ┣ 📜main.js
┃ ┃ ┗ 📜my-plugin.js
┃ ┣ 📂test
┃ ┃ ┗ 📜my-plugin.spec.js
┃ ┣ 📜README.md
┃ ┗ 📜index.html
┣ 📜package.json
┣ 📜README.md
┗ 📜vite-config.js
```

We use [Vite](https://github.com/vitejs/vite) as a dev server. This allows you to take advantage of hot reloading in development and easily build and minify code with [Rollup](https://rollupjs.org/) integration. [Playwright](https://github.com/microsoft/playwright) is also provided, so you can write intregration tests in the matching folder.

### Write your plugin

👉 Run the dev server

```bash
npm run dev
```

#### Pass props to your plugin

You can pass props to your plugin this way 👇

```html
// src/index.html

<script>
  ...
  window.$docsify = {
      name: "My plugin documentation website",

      // props
      myPlugin: {
          hello: "world",
      },
  };
  ...
</script>
```

These props will be accessible through the docsify global object in your plugin 👇

```javascript
// src/plugin/main.js
const docsify = window.$docsify || {};

const props = docsify.myPlugin || {};
```

#### Interact with Docsify lifecycle hooks

> Docsify lifecycle hooks are provided threw the **hook argument** passed to the plugin function. To have more detail about lifecycle hooks check out the [official doc](https://docsify.js.org/#/write-a-plugin?id=lifecycle-hooks).

You can attach your function to **6 differents lifecycle hooks** allowing your to modify the state of the app.

Below is the example included in the template for this project.

```javascript
const myPlugin = (props = { hello: "" }) => (hook) => hook.init(() => {
    console.log(`hello ${props.hello}`);
});
```

This is a function that will be called once when the Docsify script is **initialized** on the first load of the application. This function will simply display the parameter provided in the browser console.

![Plugin result after init](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uwi78xh8ecgp3sfv80vn.png)

The example is deliberately **very simple** here, but it's possible to modify the rendering of Docsify. By example you can add a button to copy and paste the current paragraph when hovering the content or add a custom footer on each page.

#### Detailed example

Here is a detailed example coming from the [official documentation](https://docsify.js.org/#/write-a-plugin?id=examples) interacting with two different Hooks **beforeEach** and **afterEach**. The goal is to add an edit button and a footer to each of your page.

Replace **my-plugin.js** with this content 👇

```javascript
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
```

You may noticed that we pass the **vm** property to the plugin, it's the current Docsify instance. It give us access to some property as the current file rendered.

Replace **main.js** with this content 👇

```javascript
import { editOnGitPlugin, customFooterPlugin } from "./my-plugin";

const docsify = window.$docsify || {};

const props = { editOnGitPlugin: docsify.editOnGitPlugin, customFooterPlugin: docsify.customFooterPlugin } || {};

docsify.plugins = [].concat(docsify.plugins || [], editOnGitPlugin(props.editOnGitPlugin), customFooterPlugin(props.customFooterPlugin));
```

Replace the Docsify script section in **index.html** with this content 👇

```html
<script>
    window.$docsify = {
        name: "Docsify-plugin-playground",
        repo: "",
        editOnGitPlugin: {
            repoUrl: "https://github.com/docsifyjs/docsify/blob/master/docs/",
        },
        customFooterPlugin: {
            title: "My awesome custom footer ",
            link: "https://github.com/docsifyjs/awesome-docsify",
        },
    };
</script>
```

You can now see the edit button on top of the page. On click you'll be redirect to the markdown file you want to modify on your Git repo.
The second plugin add a footer providing some informations.

![Illustration of the Docsify plugin to add edit button and footer to each page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kr4ayvtxi7ralx7t7nnm.png)

Here are detailed examples of plugins made that I've made using this template if you need some inspiration👇

- [docsify-mermaid-zoom](https://github.com/corentinleberre/docsify-mermaid-zoom)
- [docsify-replace-pattern](https://github.com/corentinleberre/docsify-replace-pattern)

#### Test your plugin

You can test your plugin using [Playwright](https://github.com/microsoft/playwright). We provide a simple test file that test the plugin function in **src/my-plugin.spec.js**.

👉 Run the tests

```bash
npm run test
```

### Deploy your plugin

To deploy this package on **npm**, you will need to have an account on npmjs.com. Once you have an account, follow these steps:

👉 Build the project with **npm run build**

You have the choice to deliver it as a CommonJS, ESModule, IIFE or UMD. By default, two artifacts CJS and ESM are generated. You can modify that in **vite-config.js**.

```text
📦dist
 ┣ 📜my-plugin.cjs
 ┗ 📜my-plugin.js
```

👉 Run **npm publish**

You can now access your package on npm with this url 👉 [https://www.npmjs.com/package/my-docsify-plugin](https://www.npmjs.com/package/my-docsify-plugin).

To use this package on your website we will use Jsdelivr.com. It will act as [Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network) proxying your npm package enabling you to use this script directly in the browser.

You can get your plugin threw this url 👉[https://cdn.jsdelivr.net/npm/my-docsify-plugin@version/dist/my-plugin.js](https://cdn.jsdelivr.net/npm/my-docsify-plugin@version/dist/my-plugin.js)

Now your users just have to add this url directly in their Docsify **index.html** page to use your plugin 👇

```html
<script src="//cdn.jsdelivr.net/npm/my-docsify-plugin@version/dist/my-plugin.js"></script>
```

If you specified **"main": "dist/my-plugin.js"** in package.json, you could also access it directly with this url 👉 [https://cdn.jsdelivr.net/npm/my-docsify-plugin@1.0.0](https://cdn.jsdelivr.net/npm/my-docsify-plugin@version)

### Conclusion

Thank you for reading this article. If you need more information, feel free to check out the Docsify's plugin documentation.

## License

This repository is licensed under the MIT License. This means that you are free to use, modify, and distribute it, as long as you include the original copyright and license notice in your documentation.

## Contributing

If you would like to contribute to this template, please fork the repository and submit a pull request. By contributing to this template, you agree to release your contributions under the MIT License.
