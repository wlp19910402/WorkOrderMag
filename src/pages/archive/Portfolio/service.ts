import type { PortfolioSearchType, PortfolioSaveDataType } from './data.d';
import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'
import type { ConsumableAddDataType, ConsumableEditDataType } from './data.d'

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

export const deleteProtfolio = async (id: React.Key) => {
  return httpServer.post(`${API.PORTFOLIO_DELETE}/${id}`)
}

export const infoProtfolio = async (id: React.Key) => {
  return httpServer.get(`${API.PORTFOLIO_INFO}/${id}`)
}
//档案耗材新增
export const addConsumableProtfolio = async (params: ConsumableAddDataType[]) => {
  return httpServer.post(API.PORTFOLIO_ADD_CONSUMABLE, { data: params });
}
//档案耗材列表
export const queryProtfolioConsumableList = async (id: React.Key) => {
  return httpServer.get(`${API.PORTFOLIO_LIST_CONSUMABLE}/${id}`)
}
//档案耗材编辑
export const updateProtfolioConsumable = async (params: ConsumableEditDataType) => {
  return httpServer.post(API.PORTFOLIO_UPDATE_CONSUMABLE, { data: params });
}
//档案耗材删除
export const deleteProtfolioConsumable = async (id: React.Key) => {
  return httpServer.post(`${API.PORTFOLIO_DELETE_CONSUMABLE}/${id}`)
}