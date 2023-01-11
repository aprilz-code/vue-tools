import Vue from 'vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
// 默认点击背景不关闭弹窗
// Element.Dialog.props.closeOnClickModal.default = false

Vue.use(Element);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
