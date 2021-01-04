import request from '@/utils/request';
import API from '@/services/API.d'
export interface LoginParamsType {
  username: string;
  password: string;
  code: string;
}
//登录
export async function fakeAccountLogin (params: LoginParamsType) {
  return request.post(API.USER_LOGIN, { data: params })
}
//根据token刷新token值
export async function fackAccountToken () {
  return request.get(API.USER_CURRENT)
}
//根据token刷新token值
export async function fackLogout () {
  return request.post(API.USER_LOGOUT)
}
