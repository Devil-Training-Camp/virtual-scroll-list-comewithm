import {Configuration} from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const path = require('path')

const baseConfig: Configuration = {
    entry: path.join(__dirname, "./src/index.tsx"),
    output: {
        filename: "js/[name].[contenthash].js",
        path: path.join(__dirname, "dist"),
        clean: true,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./public/index.html")
        })
    ]
}

export default baseConfig