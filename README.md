# create-docsify-plugin

This repository contains a template for creating your own [Docsify](https://docsify.js.org/#/) plugin from scratch. 
Using this template can help you get started quickly and ensure that your plugin follows best practices.

## Installation

Requirements : Node 16

To use this template you can clone this repository and use it as a starting point for your own plugin.

```bash
$: npx degit corentinleberre/create-docsify-plugin my-plugin
$: cd my-plugin
```

## Usage

Here is the structure of a project generated with this template. The code is stored in the **src** folder. By default Vitest is provided, so you can write your tests in the matching folder.

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

We use [Vite](https://github.com/vitejs/vite) as a dev server. This allows you to take advantage of hot reloading in development and easily build and minify code.

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

Two artifacts are generated. You have the choice to deliver it as a CommonJS module ou as an ESModule.

```text
📦dist
 ┣ 📜my-plugin.cjs
 ┗ 📜my-plugin.js
```

If you choose ESM, be aware that you will have to specify **type="module"** in your html import 👇

```html
<script type="module" src="dist/my-plugin.js"></script>
```

## Examples

### Pass props to your plugin

You can define props that you can pass to your component this way 👇

```html
// src/index.html

<script>
    window.$docsify = {
        name: "My plugin documentation",

        myPlugin: {
            hello: "world",
        },
    };
</script>
```

They will be accessible trough the docsify global object in your plugin 👇

```javascript
// src/plugin/main.js

const props = docsify.myPlugin || {};
```

### Interact with Docsify lifecycle

>Docsify lifecycle hooks are provided via the **hook argument** passed to the plugin function.

You can attach your function to **6 differents lifecycle hooks** allowing your to modify the state of the app.

Below is the example included in the template for this project. This is a function that will be called once when the Docsify script is **initialized** on the first load of the application. This function will simply display the parameter you provide in the browser console.

```javascript
const myPlugin = (props = {hello: ""}) => (hook) => hook.init(() => {
    console.log(`hello ${props.hello}`);
});
```

To have more detail about lifecycle hooks check out the [official doc](https://docsify.js.org/#/write-a-plugin?id=lifecycle-hooks)

Here are detailed examples of plugins made using this template 👇

* [docsify-mermaid-zoom](https://github.com/corentinleberre/docsify-mermaid-zoom)
* [docsify-replace-pattern](https://github.com/corentinleberre/docsify-replace-pattern)

### Test your plugin

You can test your plugin using Vitest. We provide a simple test file that test the boilerplate function in **src/my-plugin.spec.js**.

## License

This template is licensed under the MIT License. This means that you are free to use, modify, and distribute it, as long as you include the original copyright and license notice in your documentation.

## Contributing

If you would like to contribute to this template, please fork the repository and submit a pull request.
By contributing to this template, you agree to release your contributions under the MIT License.