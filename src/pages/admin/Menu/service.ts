import request from 'umi-request';
import { PageDataType, EditUserDataType } from '../data.d';

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