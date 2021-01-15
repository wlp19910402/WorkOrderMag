import type { PageDataType, DictionaryDataType } from '../data.d';
import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'

export type UserAuthorityType = {
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
  return httpServer.post(`${API.DICTIONARY_DELETE}/${id}`)
}

export const queryDictionaryType = async (type: string) => {
  return await httpServer.get(`${API.DICTIONARY_TYPE}/${type}`);
}

export const fetchDicTypeSelect = async (type: string) => {
  const response = await queryDictionaryType(type)
  if (!response) return []
  return response.data.map((item: any) => ({ label: item.value, value: item.code }))
}

export const fetchDicTypeSelectObj = async (type: string) => {
  const response = await queryDictionaryType(type)
  if (!response) return []
  let obj = {}
  response.data.map((item: any) => ({ label: item.value, value: item.code })).forEach((item: any) => {
    obj[ item.value ] = item.label
  })
  return obj
}