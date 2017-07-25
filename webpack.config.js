module.exports = {
    entry: './src/miner/main',

    output: {
        filename: 'plugin/miner.js'
    },

    module: {
        loaders: [
            { test: /src\/miner\/\.js$/, loader: "babel-loader" }
        ]
    }
};