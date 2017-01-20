module.exports = {
    entry: {
        dm: "./src/DungeonMasterApp.jsx"
        // player: "./src/player.tsx"
    },
    output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    },

    module: {
        loaders: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, loader: "babel-loader" }
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.(js|jsx)$/, loader: "source-map-loader" }
        ]
    }
};
