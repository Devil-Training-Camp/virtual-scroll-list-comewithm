import {Configuration as WebpackConfiguration} from 'webpack'
import {Configuration as WebpackDevServerConfiguration} from 'webpack-dev-server'
import {merge} from 'webpack-merge'

import baseConfig from './webpack.base'

const path = require('path')

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration
}

const HOST = '127.0.0.1'
const PORT = "8888"


const devConfig: Configuration = merge(baseConfig, {
    mode: 'development',
    devtool: "eval-cheap-module-source-map",
    devServer: {
        host: HOST,
        port: PORT,
        open: true,
        compress: false,
        hot: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "./public")
        },
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    }
})

export default devConfig
