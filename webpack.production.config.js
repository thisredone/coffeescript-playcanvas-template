const webpack = require('webpack');
const configuration = require('./config.json');

configuration.browsers = configuration.browsers || "> 1%";

module.exports = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({sourceMap: true})
    ],
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: [["env", {
                    "targets": {
                        "browsers": [configuration.browsers]
                    }
                }]]
            }
        }]
    }
};

