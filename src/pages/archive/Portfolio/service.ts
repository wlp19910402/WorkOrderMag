import type { PortfolioSearchType, PortfolioSaveDataType } from './data.d';
import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'

export const queryProtfolioList = async (params: PortfolioSearchType) => {
  return await httpServer.get(API.PORTFOLIO_LIST, {
    params: {
      pageSize: params.pageSize,
      pageNo: params.current,
      no: params.no,
      model: params.model,
      type: params.type,
      brand: params.brand,
      companyName: params.companyName,
      deviceName: params.deviceName,
      qrCodde: params.qrCodde
    }
  });
}
export const saveProtfolio = async (params: PortfolioSaveDataType) => {
  return httpServer.post(API.PORTFOLIO_SAVE, { data: params });
}

export const deleteProtfolio = async (id: string) => {
  return httpServer.post(`${API.PORTFOLIO_DELETE}/${id}`)
}

export const infoProtfolio = async (id: any) => {
  return httpServer.get(`${API.PORTFOLIO_INFO}/${id}`)
}