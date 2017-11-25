[![Build Status](https://travis-ci.org/DABH/network_animations.svg?branch=master)](https://travis-ci.org/DABH/network_animations)

# Network Animations

This is a suite of network animations built using modern web technologies.

# Organization

Source code for the animations is located in the `src` directory.  When built, the bundled output is placed into the
`dist` directory.

The `src` directory is organized into several sub-directories.  `Components` contains GUI components for the animations.
`Animations` contains definitions of the animations that make up the suite.

# Setup

The suite is built on modern web technologies (as of this writing), including Webpack and Typescript.  To get started:

1. Install [Node.js](https://nodejs.org/en/)
2. Install yarn: `npm install -g yarn`
3. Clone the repository
4. Within the repository, run `yarn` to install dependencies

The animations can now be built and viewed (see the next section).

# Testing

From the root directory, you can run `yarn start` to start a local development server on `http://localhost:8080`.
Point your browser to that address to view the animations running locally.  `yarn build` can also be run to see if
the packaging is successful.  Continuous integration is enabled for the master branch of this repository, and it
currently just runs `yarn build` to make sure everything can compile.

# License

Please see the included LICENSE.md and COPYING.

<!-- yarn add --dev webpack webpack-dev-server html-webpack-plugin path typescript babel-loader babel-core babel-preset-env awesome-typescript-loader pug-loader rimraf pug extract-text-webpack-plugin css-loader -->