// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    productionSourceMap: false,
    // chainWebpack: config => {
    //     config
    //         .plugin('webpack-bundle-analyzer')
    //         .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // },
    devServer: {
        // https: true,
        // proxy: {
        //     '^/api/*': {
        //         target: 'https://localhost:4000/api/',
        //         // ws: false,
        //         // changeOrigin: true
        //     },
        // }
    }
}
