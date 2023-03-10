import router from '@/router/index'
import store from './store'
import {Message} from 'element-ui'

//目前不校验permission，只校验一些需要登录才能使用的页面功能，后端接口涉及拦截在request.js
router.beforeEach((to, from, next) => {
    debugger


    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        if (sessionStorage.getItem('ACCESS_TOKEN')) {
            if (to.path === '/login') {
                next({path: '/'})
            } else {
                store.dispatch('GetInfo').then(() => {
                    //刷新用户信息 校验token有效性
                    next()
                }).catch(err => {
                    Message.error(err)
                    next({path: '/'})
                    // store.dispatch('LogOut').then(() => {
                    //     next({path: '/'})
                    // })
                })
            }
        }else{
            Message.error('请先登录')
            next({path: '/'})
        }

    }else{
        next()
    }

})
