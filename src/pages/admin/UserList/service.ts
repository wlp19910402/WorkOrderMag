import request from 'umi-request';
import { PageDataType, EditUserDataType } from '../data.d';
import API from '@/services/API.d'
export interface UserAuthorityType {
  "roleIds": string[],
  "userId": number
}
export const queryUserList = async (params: PageDataType) => {
  return await request.get(API.USER_LIST, {
    params: {
      pageSize: params.pageSize,
      pageNo: params.current
    }
  });
}
export const addUser = async (params: EditUserDataType) => {
  return request.post(API.USER_ADD, { data: params });
}
export const editUser = async (params: EditUserDataType) => {
  return request.post(API.USER_EDIT, { data: params });
}
//授权信息添加
export async function saveUserAuthority (params: UserAuthorityType) {
  return request.post(API.USER_AUTHORITY, { data: params })
}
export const deleteUser = async (id: string) => {
  return request.post(`${API.USER_DELETE}/${id}`)
}
//设置用户状态
export const statusUser = async (id: string) => {
  return request.post(`${API.USER_STATUS}/${id}`)
}
//获取用户角色
export const getUserRoleId = async (id: string) => {
  return await request.get(API.USER_ROLE_ID + '/' + id)
}