import type { PortfolioSearchType, PortfolioSaveDataType } from './data.d';
import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'
import type { ConsumableAddDataType, ConsumableEditDataType, PartEditDataType, PartAddDataType } from './data.d'

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