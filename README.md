# Ambien

The CryptoInsomnia React app.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Setup

This project uses [yarn](https://github.com/yarnpkg/yarn) to manage its dependencies since it gives us deterministic installs for free.

Assuming you have [yarn](https://github.com/yarnpkg/yarn) and [node 8](https://nodejs.org/en/blog/release/v8.9.0/) installed, the commands below should get you up and running. Read below if you do not have these installed.

```
$ git clone https://github.com/cryptoinsomnia/ambien.git
$ cd ambien
$ yarn install && yarn start
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

## Env Variables

See [create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-development-environment-variables-in-env) docs about environment variables.

You can set up a .env.development.local to override .env in development mode and locally for example.

## Scripts

### `$ yarn run precommit`

This is what is run before a commit. There should be no reason to run it manually. It will lint staged files and type-check the entire project using flow.

### `$ yarn run flow`

Will typecheck the files in the project.

### `$ yarn run flow-typed`

Flow-type is a central repository of flow-types for popular 3rd party libraries. Use this to install those type definitions (if the dependency does not already provide them).

### `$ yarn run start`

Start the development server.

### `$ yarn run build`

Build the project with webpack and update the `build/` folder with the static assets. No need to call this unless you want to debug as the deploy command calls this automatically.

### `$ yarn run eject`

Don't run this. It will eject us from the [Create React App](https://github.com/facebookincubator/create-react-app) setup.

### `$ yarn run deploy`

Will the deploy the app to S3/Cloudfront using [discharge](https://github.com/brandonweiss/discharge).

### `$ yarn run discharge`

Also part of discharge, but only run once to set up Cloudfront and certificates.

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

To set up Visual Studio Code to integrate with these development tools see [this article](https://hackernoon.com/configure-eslint-prettier-and-flow-in-vs-code-for-react-development-c9d95db07213) to see **what VSC extensions to install and what workspace settings to use. The js dependencies are already installed via `yarn install`**.

For reference here are some working workspace settings.

```json
{
  "javascript.validate.enable": false,
  "editor.formatOnSave": true,
  "javascript.format.enable": false,
  "flow.useNPMPackagedFlow": true,
  "prettier.eslintIntegration": true,
  "typescript.disableAutomaticTypeAcquisition": true,
  "typescript.validate.enable": false
}
```
