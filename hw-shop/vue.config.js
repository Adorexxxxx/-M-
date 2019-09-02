module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:80', // 要请求的地址
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'http://localhost:80'
        }
      }
    }
  }
};