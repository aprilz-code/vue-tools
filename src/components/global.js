// 全局组件配置


import Header from '@/components/MyHeader'; // 头部组件


Header.install = function (Vue) {
  Vue.component('MyHeader', Header);
};



// 引用本js中所有的组件
export function InstallAll (Vue) {
  Vue.use(Header)
}
