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

```
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

```
📦dist
 ┣ 📜my-plugin.cjs
 ┗ 📜my-plugin.js
```

If you choose ESM, be aware that you will have to specify **type="module"** in your html import 👇

```html
<script type="module" src="dist/my-plugin.js"></script>
```

## Examples

Here are detailed examples of plugins I have made using this template :

* [docsify-mermaid-zoom](https://github.com/corentinleberre/docsify-mermaid-zoom)
* [docsify-replace-pattern](https://github.com/corentinleberre/docsify-replace-pattern)

## License

This template is licensed under the MIT License. This means that you are free to use, modify, and distribute it, as long as you include the original copyright and license notice in your documentation.

## Contributing

If you would like to contribute to this template, please fork the repository and submit a pull request.
By contributing to this template, you agree to release your contributions under the MIT License.