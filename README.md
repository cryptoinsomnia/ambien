# Ambien

The CryptoInsomnia React app.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Setup

This should be all you need to start developing.

```
$ git clone https://github.com/cryptoinsomnia/ambien.git
$ cd ambien
$ npm install && npm start
```

The above will install the dependencies and start a development server.

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

Linting, formatting and type checking work regardless of development environment. Code is linted and formatted via a pre-commit hook. The typecheck is not part of the pre-commit hook and should be run manually via `npm run flow`.

To set up Visual Studio Code to integrate with these development tools see [this article](https://hackernoon.com/configure-eslint-prettier-and-flow-in-vs-code-for-react-development-c9d95db07213) to see what VSC extensions to install and what workspace settings to use.
