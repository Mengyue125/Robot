const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './', // 使用相对路径
  devServer: {
    proxy: {
      '/api': {
        target: 'http://web11557.y9.computerqwq.cf', // 注意域名已更新
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/Robot/public/index.php' // 精确匹配后端路径
        }
      }
    }
  }
})
