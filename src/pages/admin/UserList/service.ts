import request from 'umi-request';
import { PageDataType, EditUserDataType } from '../data.d';
import API from '@/services/API.d'
export interface UserAuthorityType {
  "roleIds": string[],
  "userId": number
}
export const queryUserList = async (params: PageDataType) => {
  let response = await request('/api/user/list', {
    method: 'Get',
    params: {
      pageSize: params.pageSize,
      pageNo: params.current
    }
  });
  return { ...response.data, data: response.data.records }
}

export const addUser = async (params: EditUserDataType) => {
  return request('/api/user/add', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

//授权信息添加
export async function saveUserAuthority (params: UserAuthorityType) {
  return request.post(API.USER_AUTHORITY, { data: params })
}
