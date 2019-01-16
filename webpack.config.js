const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const PlayCanvasWebpackPlugin = require('playcanvas-webpack-plugin');
const configuration = require('./config.json');

configuration.browsers = configuration.browsers || "> 1%";

const config = {
    entry: {
        main: './src/main.coffee'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].build.js'
    },
    plugins: [
        new PlayCanvasWebpackPlugin({
            skipUpload: process.env.UPLOAD === "no" || !configuration.bearer || configuration.bearer.length != 32,
            bearer: configuration.bearer,
            project: configuration.projectId,
            files: configuration.files || {
                "main.build.js": {path: "main.build.js", assetId: configuration.assetId}
            }
        }),
        new webpack.NamedModulesPlugin()
    ],
    module: {
        loaders: [{
            test: /\.coffee/,
            exclude: /node_modules/,
            use: [{
                loader: 'coffee-loader'
            }]
        }, {
            test: /\.glsl$/,
            use: [{loader: 'raw-loader'}]
        }]
    }
};


module.exports = merge.smart(config, require('./webpack.' + process.env.NODE_ENV + '.config.js'));
