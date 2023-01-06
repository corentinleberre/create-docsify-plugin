# create-docsify-plugin

> Docsify is a popular and lightweight documentation generator that allows you to **easily create beautiful, intuitive documentation sites** based on your markdown documentations. It includes features like a search function, a table of contents, and the ability to customize the look and feel of the site using templates and custom CSS. Thanks to that it's a popular choice for open-source documentation sites and other purposes.
> If you want to extend Docsify's features, you can use [community plugins](https://github.com/docsifyjs/awesome-docsify#plugins) or **create your own Docsify plugin**.

This repository contains a template for creating your own [Docsify](https://docsify.js.org/#/) plugin from scratch with Vite. Using this template will help you get to started quickly and ensure that your plugin follows best practices.

## Installation

> Requirements : Node 16

To use this template you can clone this repository and use it as a starting point for your own plugin 👇

```bash
$: npx degit corentinleberre/create-docsify-plugin my-plugin
$: cd my-plugin
```

## Usage

Here is the structure of a project generated with this template. The code is stored in the **src** folder. Vitest is provided, so you can write your tests in the matching folder.

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

We use [Vite](https://github.com/vitejs/vite) as a dev server. This allows you to take advantage of hot reloading in development and easily build and minify code with [Rollup](https://rollupjs.org/) integration.

👉 Run the dev server

```bash
$: npm run dev
```

👉 Run the tests

```bash
$: npm run test
```

👉 Build the plugin

```bash
$: npm run build
```

You have the choice to deliver it as a CommonJS, ESModule, IIFE or UMD. By default, two artifacts CJS and ESM are generated. You can modify that in **vite-config.js**.

```text
📦dist
 ┣ 📜my-plugin.cjs
 ┗ 📜my-plugin.js
```

After the build you can import the plugin in Docsify html 👇

```html
<script src="dist/my-plugin.js"></script>
```

## Examples

### Pass props to your plugin

You can define props that you can pass to your component this way 👇

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

They will be accessible through the docsify global object in your plugin 👇

```javascript
// src/plugin/main.js

const props = docsify.myPlugin || {};
```

### Interact with Docsify lifecycle hooks

> Docsify lifecycle hooks are provided via the **hook argument** passed to the plugin function.

You can attach your function to **6 differents lifecycle hooks** allowing your to modify the state of the app.

Below is the example included in the template for this project. This is a function that will be called once when the Docsify script is **initialized** on the first load of the application. This function will simply display the parameter provided in the browser console.

```javascript
const myPlugin =
  (props = { hello: "" }) =>
  (hook) =>
    hook.init(() => {
      console.log(`hello ${props.hello}`);
    });
```

To have more detail about lifecycle hooks check out the [official doc](https://docsify.js.org/#/write-a-plugin?id=lifecycle-hooks).

The example is deliberately **very simple** here, but it is possible to modify the rendering from Docsify, you can for example add a button to copy and paste the current paragraph when hovering the content or add a custom footer on each page.

Here are detailed examples of plugins made using this template 👇

- [docsify-mermaid-zoom](https://github.com/corentinleberre/docsify-mermaid-zoom)
- [docsify-replace-pattern](https://github.com/corentinleberre/docsify-replace-pattern)

### Test your plugin

You can test your plugin using Vitest. We provide a simple test file that test the plugin function in **src/my-plugin.spec.js**.

### Deploy your plugin

To deploy this package on npm, you will need to have an account on npmjs.com. Once you have an account, follow these steps:

- Build the project with **npm run build**
- Run **npm publish**

You can now access your package on npm with this url 👉 [https://www.npmjs.com/package/my-docsify-plugin](https://www.npmjs.com/package/my-docsify-plugin).

To use this package on your website we will use Jsdelivr.com. It will act as [Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network) proxying your npm package enabling you to use this script directly in the browser.

You can get your plugin threw this url 👉 [https://cdn.jsdelivr.net/npm/my-docsify-plugin@version/dist/my-plugin.js](https://cdn.jsdelivr.net/npm/my-docsify-plugin@version/dist/my-plugin.js)

Now your users just have to add this url directly in their Docsify **index.html** page to use your plugin 👇

```html
<script src="//cdn.jsdelivr.net/npm/my-docsify-plugin@version/dist/my-plugin.js"></script>
```

If you specified **"main": "dist/my-plugin.js"** in package.json, you could also access it directly with this url 👉 [https://cdn.jsdelivr.net/npm/my-docsify-plugin@1.0.0](https://cdn.jsdelivr.net/npm/my-docsify-plugin@version)

## License

This repository is licensed under the MIT License. This means that you are free to use, modify, and distribute it, as long as you include the original copyright and license notice in your documentation.

## Contributing

If you would like to contribute to this template, please fork the repository and submit a pull request. By contributing to this template, you agree to release your contributions under the MIT License.
