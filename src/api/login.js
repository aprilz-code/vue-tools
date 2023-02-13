import request from '@/utils/request'
import { getRefreshToken } from '@/utils/auth'

// 登录方法
export function login(mobile, password, captchaVerification, socialType, socialCode, socialState) {
    const data = {
        mobile,
        password,
        captchaVerification,
        // 社交相关
        socialType,
        socialCode,
        socialState
    }
    return request({
        url: '/member/auth/login',
        method: 'post',
        data: data
    })
}

// 登录方法
export function userLogin(userName, password, captchaVerification, socialType, socialCode, socialState) {
    const data = {
        userName,
        password,
        captchaVerification,
        // 社交相关
        socialType,
        socialCode,
        socialState
    }
    return request({
        url: '/member/auth/userLogin',
        method: 'post',
        data: data
    })
}

// 获取用户详细信息
export function getInfo() {
    return request({
        url: '/member/user/get',
        method: 'get'
    })
}

// 退出方法
export function logout() {
    return request({
        url: '/member/auth/logout',
        method: 'post'
    })
}

// 社交授权的跳转
export function socialAuthRedirect(type, redirectUri) {
    return request({
        url: '/member/auth/social-auth-redirect?type=' + type + '&redirectUri=' + redirectUri,
        method: 'get'
    })
}

// 社交快捷登录，使用 code 授权码
export function socialLogin(type, code, state) {
    return request({
        url: '/member/auth/social-login',
        method: 'post',
        data: {
            type,
            code,
            state
        }
    })
}

// 获取登录验证码
export function sendSmsCode(mobile, scene) {
    return request({
        url: '/member/auth/send-sms-code',
        method: 'post',
        data: {
            mobile,
            scene
        }
    })
}

// 短信验证码登录
export function smsLogin(mobile, code) {
    return request({
        url: '/member/auth/sms-login',
        method: 'post',
        data: {
            mobile,
            code
        }
    })
}

// 刷新访问令牌
export function refreshToken() {
    return request({
        url: '/member/auth/refresh-token?refreshToken=' + getRefreshToken(),
        method: 'post',
    })
}

// ========== OAUTH 2.0 相关 ==========

export function getAuthorize(clientId) {
    return request({
        url: '/system/oauth2/authorize?clientId=' + clientId,
        method: 'get'
    })
}

export function authorize(responseType, clientId, redirectUri, state,
                          autoApprove, checkedScopes, uncheckedScopes) {
    // 构建 scopes
    const scopes = {}
    for (const scope of checkedScopes) {
        scopes[scope] = true
    }
    for (const scope of uncheckedScopes) {
        scopes[scope] = false
    }
    // 发起请求
    return request({
        url: '/system/oauth2/authorize',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        params: {
            response_type: responseType,
            client_id: clientId,
            redirect_uri: redirectUri,
            state: state,
            auto_approve: autoApprove,
            scope: JSON.stringify(scopes)
        },
        method: 'post'
    })
}

// 获取验证图片  以及token
export function reqGet(data) {
    return request({
        url: 'system/captcha/get',
        method: 'post',
        data
    })
}

// 滑动或者点选验证
export function reqCheck(data) {
    return request({
        url: '/system/captcha/check',
        method: 'post',
        data
    })
}

export class socialBindLogin {
}
