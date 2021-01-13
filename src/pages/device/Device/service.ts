import request from 'umi-request';
import { DeviceSearchType, DeviceSaveDataType } from '../data.d';
import API from '@/services/API.d'
export interface UserAuthorityType {
  "roleIds": string[],
  "userId": number
}
export const queryDeviceList = async (params: DeviceSearchType) => {
  return await request.get(API.DEVICE_LIST, {
    params: {
      pageSize: params.pageSize,
      pageNo: params.current,
      name: params.name,
      no: params.no,
      specification: params.specification,
      type: params.type
    }
  });
}
export const saveDevice = async (params: DeviceSaveDataType) => {
  return request.post(API.DEVICE_SAVE, { data: params });
}

export const deleteDevice = async (id: string) => {
  return request.post(`${API.DEVICE_DELETE}/${id}`)
}