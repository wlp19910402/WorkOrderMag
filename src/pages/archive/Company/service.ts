import type { CompanySearchType, CompanySaveDataType } from './data';
import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'

export const queryCompanyList = async (params: CompanySearchType) => {
  return await httpServer.get(API.COMPANY_LIST, {
    params: {
      pageSize: params.pageSize,
      pageNo: params.current,
      company: params.company,
      no: params.no,
      contactMobile: params.contactMobile,
      contactUser: params.contactUser
    }
  });
}
export const saveCompany = async (params: CompanySaveDataType) => {
  return httpServer.post(API.COMPANY_SAVE, { data: params });
}

export const deleteCompany = async (id: string) => {
  return httpServer.post(`${API.COMPANY_DETAIL}/${id}`)
}