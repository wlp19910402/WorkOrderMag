import request from 'umi-request';
import { EditRoleDataType } from './data.d';
import API from '@/services/API.d'

//角色列表
export const queryRoleList = async () => {
  return await request.post(API.ROLE_LIST);
}
//角色保存
export const saveRole = async (params: EditRoleDataType) => {
  return await request.post(API.ROLE_SAVE, { data: params })
}
//角色绑定
export const BindRole = async (params: EditRoleDataType) => {
  return await request.post(API.ROLE_SAVE, { data: params })
}