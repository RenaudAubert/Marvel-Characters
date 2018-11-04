# Marvel Characters App

Single-page App using Marvel API.

- [Marvel Characters](#Marvel-Characters)
  - [Introduction](#introduction)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)
  - [Quick Start](#quick-start)
  - [Documentation](#documentation)
    - [Folder Structure](#folder-structure)
    - [Babel](#babel)
    - [ESLint](#eslint)
    - [Webpack](#webpack)
    - [Webpack dev server](#webpack-dev-server)
    - [Nodemon](#nodemon)
    - [Express](#express)
    - [Concurrently](#concurrently)

## Introduction

This is a full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend. This application was created using the [simple-react-full-stack](https://github.com/crsandeep/simple-react-full-stack) boilerplate.

### Development mode

In the development mode, 2 servers are running. The front end code is served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code is served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, only 1 server is running. All the client side code is bundled into static files using webpack and is served by the Node.js/Express application.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/RenaudAubert/Marvel-Characters

# Go inside the directory
cd Marvel-Characters

# Install dependencies
npm install (or yarn)

# Start development server
npm run dev (or yarn dev)

# Build for production
npm run build (or yarn build)

# Start production server
npm start (or yarn start)
```

## Documentation

### Folder Structure

.
├── public
│   └── index.html
├── src                              # Contains all source code
│   ├── client                       # Frontend code (js/jsx, css)
│   │   ├── App.css                  # Style for the app
│   │   ├── App.js                   # Main component
│   │   ├── Character.js             # Character card in the view
│   │   ├── CharacterList.js
│   │   ├── DetailedCharacter.js     # Detailed Character view
│   │   ├── index.js                 # Entry point to the front application
│   │   └── layout.js                # Layout component (Header, Footer, etc...)
│   ├── server                       # Backend code (Node.js/Express)
│   │   └── index.js                 # Entry point to the server application
│   └── test                         # Unit tests
├── .babelrc                         # Babel configuration file
├── .eslintrc.json                   # ESlint configuration file
├── nodemon.json                     # nodemon configuration file
├── README.md
└── webpack.config.js                # Webpack configuration file

### Babel

Below is the .babelrc file which used.

```javascript
{
    "presets": ["env", "react"]
}
```

Babel requires plugins to do the transformation. Presets are the set of plugins defined by Babel. Preset **env** allows to use babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 and it will transform them to ES5. Preset **react** allows to use JSX syntax and it will transform JSX to Javascript.

### ESLint

Below is the .eslintrc.json file used.

```javascript
{
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "no-console": "off",
    "comma-dangle": "off",
    "react/jsx-filename-extension": "off"
  }
}
```

### Webpack


[webpack.config.js](https://webpack.js.org/configuration/) file is used to describe the configurations required for webpack. Below is the webpack.config.js file used.

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    },
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
```

1.  **entry:** Here the application starts executing and webpack starts bundling
2.  **output path and filename:** the target directory and the filename for the bundled output
3.  **module loaders:** Module loaders are transformations that are applied on the source code of a module. We pass all the js file through [babel-loader](https://github.com/babel/babel-loader) to transform JSX to Javascript. CSS files are passed through [css-loaders](https://github.com/webpack-contrib/css-loader) and [style-loaders](https://github.com/webpack-contrib/style-loader) to load and bundle CSS files. Fonts and images are loaded through url-loader.
4.  **Dev Server:** Configurations for the webpack-dev-server which will be described in coming section.
5.  **plugins:** [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) is a webpack plugin to remove the build folder(s) before building. [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) simplifies creation of HTML files to serve your webpack bundles. It loads the template (public/index.html) and injects the output bundle.

### Webpack dev server

[Webpack dev server](https://webpack.js.org/configuration/dev-server/) is used along with webpack. It provides a development server that provides live reloading for the client side code. This should be used for development only.

The devServer section of webpack.config.js contains the configuration required to run webpack-dev-server which is given below.

```javascript
devServer: {
    port: 3000,
    open: true,
    proxy: {
        "/api": "http://localhost:8080"
    },
    publicPath: '/'
}
```

[**Port**](https://webpack.js.org/configuration/dev-server/#devserver-port) specifies the Webpack dev server to listen on this particular port. When [**open**](https://webpack.js.org/configuration/dev-server/#devserver-open) is set to true, it will automatically open the home page on startup. [Proxy](https://webpack.js.org/configuration/dev-server/#devserver-proxy) URL to send API requests.
[publicPath](https://webpack.js.org/guides/public-path/)
Base path for all assets in the application.

### express

The routing middleware responds to two endpoints:
- /api/characters (sends the 20 first characters)
- /api/characters/:id sends a specific

Server cache is used to store information for 24 hours as advised by the [Marvel documentation](https://developer.marvel.com/documentation/generalinfo).

### Nodemon

Nodemon is a utility that will monitor for any changes in the server source code and it automatically restart the server. This is used in development only.

nodemon.json file is used to describe the configurations for Nodemon. Below is the nodemon.json file which I am using.

```javascript
{
  "watch": ["src/server/"]
}
```

Here, we tell nodemon to watch the files in the directory src/server where out server side code resides. Nodemon will restart the node server whenever a file under src/server directory is modified.

### Concurrently

[Concurrently](https://github.com/kimmobrunfeldt/concurrently) is used to run multiple commands concurrently. Below are the npm/yarn script commands used.

```javascript
"client": "webpack-dev-server --mode development --devtool inline-source-map --hot",
"server": "nodemon src/server/index.js",
"dev": "concurrently \"npm run server\" \"npm run client\""
```
