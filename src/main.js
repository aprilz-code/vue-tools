import Vue from 'vue'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import Clipboard from 'clipboard'
import AVUE from '@assets/js/avue.min.js'
import './auth'
import store from './store'
import '@assets/css/avue.css'
//引入'font-awesome 字体样式
import 'font-awesome/css/font-awesome.min.css'
// 全局引入封装组件
import {InstallAll} from '@/components/global.js';

// 引入ali icon
import "@/assets/css/iconfont/iconfont.css";


Vue.prototype.$clipboard = Clipboard;

// 默认点击背景不关闭弹窗
// Element.Dialog.props.closeOnClickModal.default = false

Vue.use(Element);
Vue.use(AVUE);
Vue.use(InstallAll);

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
