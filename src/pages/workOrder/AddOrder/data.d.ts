export type PageDataType = {
  current: number;
  pageSize: number;
}
export interface OrderTypeType {
  company: string;
  customerMobile: string;
  customerName: string;
  imgUrls: string[];
  orderType: "az" | "wx" | "xj" | "jd";
  portfolioId?: number;//档案id
  workDescription: string;
}
export const orderTypeData = [
  { label: "安装工单", value: "az" },
  { label: "维修工单", value: "wx" },
  { label: "巡检工单", value: "xj" },
  { label: "建档工单", value: "jd" }
]
export const orderStatusData = [
  { label: "未派单", value: "wpd" },
  { label: "派单", value: "pd" },
  { label: "接单", value: "jd" },
  { label: "转单", value: "zd" },
  { label: "完成", value: "wc" },
]
export interface OrderListSearchType extends PageDataType {
  company: string;
  createTimeEnd: string;
  createTimeStart: string;
  customerMobile: string;
  customerName: string;
  engineerName: string;
  orderNo: string;
  orderType: string;
  receivingTimeEnd: string;
  receivingTimeStart: string;
  sourceType: string;
  status: string;
}
export interface OrderListType extends OrderTypeType {
  createTime: string;
  createUser: string;
  createUserName: string;
  // customerMobile: string;
  // customerName: string;
  deviceName: string;
  deviceType: string;
  engineerId: number;
  engineerName: string;
  id: number;
  // imgUrls: string[];
  orderNo: string;
  // orderType: string;
  // portfolioId: string;
  receivingTime: string;
  sourceType: string;
  status: string;
  // workDescription: string;
}
