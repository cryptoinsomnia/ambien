# Ambien

The CryptoInsomnia React app.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Setup

This project uses [yarn](https://github.com/yarnpkg/yarn) to manage its dependencies since it gives us deterministic installs for free.

Assuming you have [yarn](https://github.com/yarnpkg/yarn) and [node 8](https://nodejs.org/en/blog/release/v8.9.0/) installed, the commands below should get you up and running. Read below if you do not have these installed. 
```
$ git clone https://github.com/cryptoinsomnia/ambien.git
$ cd ambien
$ yarn install && npm start
```

### Installing yarn
```
$ brew update && brew install yarn
```
### Installing node 8
The preferred way of managing node versions is with [nvm](https://github.com/creationix/nvm). Install nvm and then. 
``` 
$ nvm install lts/carbon
$ nvm use lts/carbon
```

## Scripts
### `$ yarn run precommit` 
This is what is run before a commit. There should be no reason to run it manually. It will lint staged files and type-check the entire project using flow.

### `$ yarn run`

## Main Prod Dependencies

* [Recompose](https://github.com/acdlite/recompose)
* [Ant Design](https://github.com/ant-design/ant-design)
* [Styled Components](https://github.com/styled-components/styled-components)
* [Grid Styles](https://github.com/jxnblk/grid-styled)

## Main Development Dependencies

* [Discharge](https://github.com/brandonweiss/discharge)
* [Flow](https://flow.org/)
* [Flow-Typed](https://github.com/flowtype/flow-typed)
* [ESLint](https://github.com/eslint/eslint)
* [Prettier](https://github.com/prettier/prettier)

## Development Environment

Linting, formatting and type checking work regardless of development environment. Code is linted, formatted and typechecked via a pre-commit hook.

To set up Visual Studio Code to integrate with these development tools see [this article](https://hackernoon.com/configure-eslint-prettier-and-flow-in-vs-code-for-react-development-c9d95db07213) to see **what VSC extensions to install and what workspace settings to use. The js dependencies are already installed via `yarn install`**

For reference here are some working workspace settings.
```json
{
  "javascript.validate.enable": false,
  "editor.formatOnSave": true,
  "javascript.format.enable": false,
  "flow.useNPMPackagedFlow": true,
  "prettier.eslintIntegration": true,
  "typescript.disableAutomaticTypeAcquisition": true,
  "typescript.validate.enable": false,
}
```
