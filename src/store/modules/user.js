import { logout, getInfo, socialLogin, smsLogin, userLogin} from '@/api/login'
import {setToken, removeToken} from '@/utils/auth'

const user = {
    state: {
        id: '', // 用户编号
        nickname: '',
        userName:'',
        avatar: '',
        //token: ''
        //tokene存在store中，刷新会丢失
    },

    mutations: {
        SET_ID: (state, id) => {
            state.id = id
        },
        SET_USERNAME: (state, userName) => {
            state.userName = userName
        },
        SET_NICKNAME: (state, nickname) => {
            state.nickname = nickname
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },

    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            const userName = userInfo.userName
            const password = userInfo.password
            const captchaVerification = userInfo.captchaVerification
            const socialCode = userInfo.socialCode
            const socialState = userInfo.socialState
            const socialType = userInfo.socialType
            return new Promise((resolve, reject) => {
                userLogin(userName, password, captchaVerification, socialType, socialCode, socialState).then(res => {
                    res = res.data;
                    // 设置 token
                    setToken(res)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 社交登录
        SocialLogin({ commit }, userInfo) {
            const code = userInfo.code
            const state = userInfo.state
            const type = userInfo.type
            return new Promise((resolve, reject) => {
                socialLogin(type, code, state).then(res => {
                    res = res.data;
                    // 设置 token
                    setToken(res)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 短信登录
        SmsLogin({ commit }, userInfo) {
            const mobile = userInfo.mobile.trim()
            const mobileCode = userInfo.mobileCode
            return new Promise((resolve, reject) => {
                smsLogin(mobile,mobileCode).then(res => {
                    res = res.data;
                    // 设置 token
                    setToken(res)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                getInfo().then(res => {
                    // 没有 data 数据，return
                    if (!res) {
                        resolve(res)
                    }
                    res = res.data; // 读取 data 数据
                    const avatar = ( res.avatar === "" || res.avatar == null ) ? require("@/assets/images/profile.jpg") : user.avatar;
                    commit('SET_ID', res.id)
                    commit('SET_NICKNAME', res.nickname)
                    commit('SET_USERNAME', res.userName)
                    commit('SET_AVATAR', avatar)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 退出系统
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user
