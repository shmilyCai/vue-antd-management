const path = require('path');

const config = require('./src/config')

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

let BASE_URL = ''
switch (process.env.NODE_ENV) {
    case 'development':
        BASE_URL = config.publicPath.dev  //这里是本地的请求url
        break
    case 'production':
        BASE_URL = config.publicPath.pro   //生产环境url
        break
}


module.exports = {
    // 基本路径
    publicPath: BASE_URL,
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    // 文件名使用hash
    filenameHashing: true,
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': resolve('src'),
                '@components': resolve('src/components'),
                '@views': resolve('src/views'),
                '@assets': resolve('src/assets'),
                '@api': resolve('src/api'),
                '@utils': resolve('src/utils'),
                '@mixins': resolve('src/mixins'),
                '@http': resolve('src/http'),
            }
        },
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#906b41',
                    'border-radius-base': '2px',
                },
                javascriptEnabled: true
            }
        }
    },
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/': {
                target: 'http://172.30.1.53:8081',//代理地址，这里设置的地址会代替axios中设置的baseURL
                changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
                pathRewrite: {}
            }
        }
    }
}