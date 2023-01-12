// 引入path
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

// 开启gzip压缩
const CompressionPlugin = require('compression-webpack-plugin')

const name = 'aprilz工具箱' // 网页标题

const port = 9090



// 配置参考官网 https://cli.vuejs.org/zh/config/#baseurl
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './', // 基本路径
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',//true代表开启eslint校验
  //transpileDependencies: true, //如果处在低级浏览器范围内，那么会把node_modules里用得到的高级语法进行babel编译,设置true会降低构建速度
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    host: '192.168.1.10', // 允许局域网ip访问
    port: port,
    open: false, //启动完自动打开浏览器
    historyApiFallback: true, // 因为使用histery模式，必须配置这一项，否则刷新页面出现 CANNOT GET
    proxy: {
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://192.168.1.10:48080/app-api',
        // target: `http://api-dashboard.yudao.iocoder.cn`,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }

    },
  },
  // 使用别名目录， 支持@/pages这种语法--这里是链式配置
  chainWebpack: (config) => {
    config.resolve.alias
        .set('@', resolve('src'))
        .set('@assets', resolve('src/assets'))
    // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  },
  //对象式配置
  configureWebpack: {
    name: name,
    // resolve: {
    //   alias: {
    //     '@': resolve('src')
    //   }
    // },
    plugins: [
      // http://doc.ruoyi.vip/ruoyi-vue/other/faq.html#使用gzip解压缩静态文件
      new CompressionPlugin({
        test: /\.(js|css|html)?$/i,     // 压缩文件格式
        filename: '[path][base].gz',   // 压缩后的文件名
        algorithm: 'gzip',              // 使用gzip压缩
        minRatio: 0.8,                // 压缩率小于1才会压缩
        threshold: 10240,
        deleteOriginalAssets: false // 是否删除原资源 // 不能删除源文件，不然报错"Uncaught SyntaxError: Unexpected token <"
      })
    ],
  },
})
