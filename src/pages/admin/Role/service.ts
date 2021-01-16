import type { RoleDataType } from './data.d';
import API from '@/services/API.d'
import type { SaveRoleParamsType } from './components/ModalMenuTree'
import httpServer from '@/utils/httpServer'

// 角色列表
export const queryRoleList = async () => {
  return await httpServer.get(API.ROLE_LIST);
}
// 角色保存
export const saveRole = async (params: RoleDataType) => {
  return await httpServer.post(API.ROLE_SAVE, { data: params })
}
// 删除用户
export const deleteRole = async (id: string) => {
  return await httpServer.post(`${API.ROLE_DELETE}/${id}`)
}
// 角色绑定
export const BindRole = async (params: SaveRoleParamsType) => {
  return await httpServer.post(API.ROLE_BIND, { data: params })
}
// 绑定权限回显
export const getRoleDetail = async (id: string) => {
  return await httpServer.get(`${API.ROLE_INFO}/${id}`)
}