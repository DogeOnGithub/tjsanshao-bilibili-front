module.exports = {
    devServer: {
        port: 8090,
        proxy: {
            '/bilibili': {
                //target: 'https://www.tjsanshao.top',
                target: 'http://localhost:10080',
                changeOrigin: true,
                pathRewrite: {
                    '^/bilibili': '/'
                }
            }
        }
    }
}