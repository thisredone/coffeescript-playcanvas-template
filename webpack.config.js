const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const PlayCanvasWebpackPlugin = require('playcanvas-webpack-plugin');
const configuration = require('./config.json');


module.exports = function(env) {
  if (!env) env = { development: true };

  const config = {
    entry: {
      main: './src/main.coffee'
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].build.js'
    },
    resolve: {
      extensions: ['.js', '.coffee']
    },
    plugins: [
      new PlayCanvasWebpackPlugin({
        skipUpload: env.development || !configuration.bearer || configuration.bearer.length != 32,
        bearer: configuration.bearer,
        project: configuration.projectId,
        files: configuration.files || {
          "main.build.js": {
            path: "main.build.js",
            assetId: configuration.assetId
          }
        }
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: env.production ? 'production' : 'development'
      })
    ],
    module: {
      rules: [
        {
          test: /\.coffee/,
          exclude: /node_modules/,
          loader: 'coffee-loader'
        },
        {
          test: /\.glsl$/,
          loader: 'raw-loader'
        }
      ]
    }
  };

  let extraConfig = {}

  if (env.production) {

    extraConfig = {
      mode: 'production',
      devtool: 'cheap-source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              }
            }
          }
        ]
      }
    };
  } else {

    extraConfig = {
      mode: 'development',
      devtool: 'inline-source-map',
      devServer: {
        port: 8081,
        disableHostCheck: true,
        contentBase: './build',
        hot: true,
        overlay: true,
        inline: true,
        open: false,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      }
    };
  }

  return merge.smart(config, extraConfig);
}
