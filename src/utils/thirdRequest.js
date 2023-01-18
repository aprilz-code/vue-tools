import axios from 'axios'

//第三方接口使用，需要拼接上proxy

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const thirdService = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    //baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 30000,
    // 禁用 Cookie 等信息
    withCredentials: false,
})




export default thirdService
