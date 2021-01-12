import request from 'umi-request';
import { PageDataType, DictionaryDataType } from '../data.d';
import API from '@/services/API.d'
export interface UserAuthorityType {
  "roleIds": string[],
  "userId": number
}
export const queryDictionaryList = async (params: PageDataType) => {
  return await request.get(API.DICTIONARY_LIST, {
    params: {
      pageSize: params.pageSize,
      pageNo: params.current
    }
  });
}
export const saveDictionary = async (params: DictionaryDataType) => {
  return request.post(API.DICTIONARY_SAVE, { data: params });
}

export const deleteDictionary = async (id: string) => {
  return request.get(`${API.DICTIONARY_DELETE}/${id}`)
}