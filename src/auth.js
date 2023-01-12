import router from '@/router/index'


//目前不校验permission，只校验一些需要登录才能使用的页面功能，后端接口涉及拦截在request.js

router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        if (localStorage.getItem('ACCESS_TOKEN')) {// 判断是否登录
            next()
        } else {// 没登录则跳转到登录界面
            next({
                path: '/login',
                query: {redirect: to.path}
            })
        }
    } else {
        next()
    }
})
