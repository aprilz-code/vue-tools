// 引入path
const path = require('path');
function resolve (dir) {
  return path.join(__dirname, dir)
}

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true, //如果处在低级浏览器范围内，那么会把node_modules里用得到的高级语法进行babel编译
  lintOnSave: true,//true代表开启eslint校验
  // 使用别名目录， 支持@/pages这种语法
  chainWebpack: (config) => {
    config.resolve.alias
        .set('@', resolve('src'))
        .set('@assets', resolve('src/assets'))
    // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))
  }
})
