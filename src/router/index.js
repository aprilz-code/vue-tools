import Vue from 'vue'
import Router from 'vue-router'

import appMain from '@/components/AppMain'

Vue.use(Router)

// 公共路由
export const constantRoutes = [
    // {
    //   path: '/redirect',
    //   component: Layout,
    //   hidden: true,
    //   children: [
    //     {
    //       path: '/redirect/:path(.*)',
    //       component: (resolve) => require(['@/pages/redirect'], resolve)
    //     }
    //   ]
    // },

    // {
    //   path: '/sso',
    //   component: (resolve) => require(['@/pages/sso'], resolve),
    //   hidden: true
    // },
    // {
    //   path: '/social-login',
    //   component: (resolve) => require(['@/pages/socialLogin'], resolve),
    //   hidden: true
    // },

    {
        path: '/', // 这个代表首页
        component: (resolve) => require(['@/pages/index'], resolve),
        name: '首页'
    },
    {
        path: '/news',
        component: (resolve) => require(['@/pages/news'], resolve),
        name: '热搜'
    },
    {
        path: '/tools',
        hidden: true,
        component: appMain, //必须添加，否则子路由无法访问，出现白屏
        children: [
            {
                path: 'tbShow', // 这种错误格式/tbShow，子路由不需要/
                component: (resolve) => require(['@/pages/tools/tbShow'], resolve),
                name: '淘宝买家秀',
            }
        ]
    },
    {
        path: '/tools',
        hidden: true,
        component: appMain, //必须添加，否则子路由无法访问，出现白屏
        children: [
            {
                path: 'JDTool', // 这种错误格式/tbShow，子路由不需要/
                component: (resolve) => require(['@/pages/tools/jdTool'], resolve),
                name: 'jd口令解析',
            }
        ]
    },
    {
        path: '/needAuth',
        component: (resolve) => require(['@/pages/needAuth'], resolve),
        name: '登录后跳转页',
        meta: {
            requireAuth: true //该处代表需要登录才能访问的页面
        },
     },
    {
        path: '/login',
        component: (resolve) => require(['@/pages/login'], resolve)
    },
    {
        path: '/404',
        component: (resolve) => require(['@/pages/error/404'], resolve),
        hidden: true
    },
    {
        path: '/401',
        component: (resolve) => require(['@/pages/error/401'], resolve),
        hidden: true
    }

]

export default new Router({
    base: process.env.VUE_APP_APP_NAME ? process.env.VUE_APP_APP_NAME : "/",
    mode: 'history', // 去掉url中的#
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})
