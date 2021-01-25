import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'
import { OrderListSearchType } from '@/pages/workOrder/data.d'

export const queryList = async (params: OrderListSearchType) => {
  return await httpServer.get(API.WORK_ORDER_LIST, {
    params: {
      pageSize: params.pageSize,
      pageNo: params.current,
      company: params.company,
      createTimeEnd: params.createTimeEnd,
      createTimeStart: params.createTimeStart,
      customerMobile: params.customerMobile,
      customerName: params.customerName,
      engineerName: params.engineerName,
      orderNo: params.orderNo,
      orderType: params.orderType,
      receivingTimeEnd: params.receivingTimeEnd,
      receivingTimeStart: params.receivingTimeStart,
      sourceType: params.sourceType,
      status: params.status,
    }
  });
}

export const bindProtolio = async (params: any) => {
  return httpServer.post(API.WORK_ORDER_BIND_PROTFOLIO, { data: params });
}