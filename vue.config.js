const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    productionSourceMap:false,
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
    }

}