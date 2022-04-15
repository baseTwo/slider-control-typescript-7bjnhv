# typescript-7bjnhv

# Welcome
My attempt to write a composite slider control in TypeScript. It is composite in the sense that is contains an adjustable range and a thumb control.

```
  The layers of the slider control:   Description and Properties:
  1.   _________________________      The Base of the control.
      (                         )     - height (px)            - width (px)
      :‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾:     - fill (color)           - stroke (color)
      :---------width---------->:     - cornerRadius (px)      - strokeWidth (px)
      :
  2.  :      _______________          The Range of the thumb.
      :     (               )         - v1 (px)                - v2 (px)
      :-v1->:‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾:         - fill (color)           - stroke (color)
      :---------v2--------->:
      :
  3.  :        __                     The Thumb control
      :       (  )                    - v (px)
      :--v--->:‾‾
```

# Dev Tools Used
- Created repo only with the TypeScript template on [StackBlitz ⚡️](https://stackblitz.com/edit/typescript-7bjnhv)
- Synchronized to GitHub repo `baseTwo/slider-control-typescript-7bjnhv`
- [GitHub CLI](https://cli.github.com/), a command line tool for GitHub
- [VSCode](https://code.visualstudio.com/), a free Integrated Developer Environment (IDE)
  VSCode Extensions:
  - [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)
  - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- [NVM for Windows](https://github.com/coreybutler/nvm-windows), a strongly recommended installer to manage multiple versions of Node.js
- [npm](https://www.npmjs.com/), a Node package manager. (Should be installed automatically with NVM - unsure)

  Global Packages:
  - [typescript](https://www.typescripttutorial.net/typescript-tutorial/setup-typescript/)

  Dev Packages:
  - @types/lodash
  - [concurrently](https://www.npmjs.com/package/concurrently)
  - [rimraf](https://www.npmjs.com/package/rimraf)
  - ts-loader
  - [typescript](https://www.typescripttutorial.net/typescript-tutorial/setup-typescript/)
  - [webpack](https://www.npmjs.com/package/webpack)
  - [webpack-cli](https://www.npmjs.com/package/webpack-cli)

  Runtime Packages:
  - [lodash](https://www.npmjs.com/package/lodash)
  - [foreach](https://www.npmjs.com/package/foreach)

# Folder Structure
```
 📄 README.md                              This file
 📄 .gitignore                             Files to ignore in git
 📄 tsconfig.json                          TypeScript Compiler Configuration
 📄 package.json                           NPM Package Dependency Configuration
 📄 launch.json                            VSCode Launch Settings
 📄 webpack.config.js                      Webpack Configuration
 📁 src
  │ 📄 source files (.ts, .css, .html)
 📁 dist
    📄 compiled files (.js)
```