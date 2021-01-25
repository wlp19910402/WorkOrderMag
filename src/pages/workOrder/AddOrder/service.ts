import API from '@/services/API.d'
import httpServer from '@/utils/httpServer'
import { OrderTypeType } from '@/pages/workOrder/data'

export const addWorkOrder = async (params: OrderTypeType) => {
  return await httpServer.post(API.WORK_ORDER_ADD, { data: params });
}