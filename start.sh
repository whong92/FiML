#!/bin/bash
# to start a react app in the django framework,
# - create an templates/index.html template to include your SPA
# - add that to the main view for the frontend app
# - create index.js in src/ and import app into that
# cd to the root folder and run:

npm init -y
npm i -D webpack webpack-cli
npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties
npm install react react-dom prop-types

# add a .babelrc and add the following lines:
#
# {
#     "presets": ["@babel/preset-env", "@babel/preset-react"],
#     "plugins": ["transform-class-properties"]
# }

# add a webpack.config.js file and the following lines:
# 
# module.exports = {
#     module: {
#         rules: [
#             {
#                 test: /\.js$/,
#                 exclude: /node_modules/,
#                 use: {
#                     loader: "babel-loader"
#                 }
#             }
#         ]
#     }
# }

# add the following npm scripts to your package.json
# "scripts": {
#     "dev": "webpack --mode development --watch ./FiML/frontend/src/index.js --output ./FiML/frontend/static/frontend/main.js",
#     "build": "webpack --mode production ./FiML/frontend/src/index.js --output ./FiML/frontend/static/frontend/main.js"
#   },

# AND OFF YOU GO!