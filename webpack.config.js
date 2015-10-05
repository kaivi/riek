module.exports = {
    entry: ['babel/polyfill', './demo/src/demo.js'],
    output: {
        path: './demo',
        filename: 'demo.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel?stage=0',
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.jsx', '.js']
    }
};
