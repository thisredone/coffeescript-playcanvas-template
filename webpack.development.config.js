const configuration = require('./config.json');


module.exports = {
    devtool: '#inline-source-map',
    devServer: {
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
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: [["env", {
                    "targets": {
                        "browsers": [configuration.browsers]
                    }
                }]],
                plugins: ['transform-runtime']
            }
        }]
    }
};

