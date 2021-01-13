import { DeviceSearchType, DeviceSaveDataType } from '../data.d';
import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'
export interface UserAuthorityType {
  "roleIds": string[],
  "userId": number
}
export const queryDeviceList = async (params: DeviceSearchType) => {
  return await httpServer.get(API.DEVICE_LIST, {
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
  return httpServer.post(API.DEVICE_SAVE, { data: params });
}

export const deleteDevice = async (id: string) => {
  return httpServer.post(`${API.DEVICE_DELETE}/${id}`)
}