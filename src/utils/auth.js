import {decrypt, encrypt} from "@/utils/jsencrypt";


const AccessTokenKey = 'ACCESS_TOKEN'
const RefreshTokenKey = 'REFRESH_TOKEN'

// ========== Token 相关 ==========

export function getAccessToken() {
  return sessionStorage.getItem(AccessTokenKey)
}

export function getRefreshToken() {
  return sessionStorage.getItem(RefreshTokenKey)
}

export function setToken(token) {
  sessionStorage.setItem(AccessTokenKey, token.accessToken)
  sessionStorage.setItem(RefreshTokenKey, token.refreshToken)
}

export function removeToken() {
  sessionStorage.removeItem(AccessTokenKey)
  sessionStorage.removeItem(RefreshTokenKey)
}

// ========== 账号相关 ==========

const UsernameKey = 'USERNAME'
const PasswordKey = 'PASSWORD'
const RememberMeKey = 'REMEMBER_ME'

export function getUsername() {
  return sessionStorage.getItem(UsernameKey)
}

export function setUsername(username) {
  sessionStorage.setItem(UsernameKey, username)
}

export function removeUsername() {
  sessionStorage.removeItem(UsernameKey)
}

export function getPassword() {
  const password = sessionStorage.getItem(PasswordKey)
  return password ? decrypt(password) : undefined
}

export function setPassword(password) {
  sessionStorage.setItem(PasswordKey, encrypt(password))
}

export function removePassword() {
  sessionStorage.removeItem(PasswordKey)
}

export function getRememberMe() {
  return sessionStorage.getItem(RememberMeKey) === 'true'
}

export function setRememberMe(rememberMe) {
  sessionStorage.setItem(RememberMeKey, rememberMe)
}

export function removeRememberMe() {
  sessionStorage.removeItem(RememberMeKey)
}



