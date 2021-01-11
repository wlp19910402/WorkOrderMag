import request from 'umi-request';
import { RoleDataType } from './data.d';
import API from '@/services/API.d'

//角色列表
export const queryRoleList = async () => {
  return await request.post(API.ROLE_LIST);
}
//角色保存
export const saveRole = async (params: RoleDataType) => {
  return await request.post(API.ROLE_SAVE, { data: params })
}
//角色绑定
export const BindRole = async (params: RoleDataType) => {
  return await request.post(API.ROLE_SAVE, { data: params })
}
//删除用户
export const deleteRole = async (id: string) => {
  return await request.post(API.ROLE_DELETE + "/" + id)
}