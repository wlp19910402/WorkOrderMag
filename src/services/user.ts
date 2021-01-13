import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'
import localforage from 'localforage'
export interface LoginParamsType {
  username: string;
  password: string;
  code: string;
}
//登录
export async function fakeAccountLogin (params: LoginParamsType) {
  return httpServer.post(API.USER_LOGIN, { data: params })
}
//根据token刷新token值
export async function fackAccountToken () {
  let res = await localforage.getItem("token")
  if (!res) {
    return
  }
  return httpServer.get(API.USER_CURRENT)
}
//根据token刷新token值
export async function fackLogout () {
  return httpServer.post(API.USER_LOGOUT)
}
