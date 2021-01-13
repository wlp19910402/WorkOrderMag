import { PageDataType, DictionaryDataType } from '../data.d';
import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'
export interface UserAuthorityType {
  "roleIds": string[],
  "userId": number
}
export const queryDictionaryList = async (params: PageDataType) => {
  return await httpServer.get(API.DICTIONARY_LIST, {
    params: {
      pageSize: params.pageSize,
      pageNo: params.current
    }
  });
}
export const saveDictionary = async (params: DictionaryDataType) => {
  return httpServer.post(API.DICTIONARY_SAVE, { data: params });
}

export const deleteDictionary = async (id: string) => {
  return httpServer.get(`${API.DICTIONARY_DELETE}/${id}`)
}