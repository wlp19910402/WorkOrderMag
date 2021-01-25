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
export const orderTypeEnum = {
  az: "安装工单",
  wx: "维修工单",
  xj: "巡检工单",
  jd: "建档工单"
}
export const orderStatusData = [
  { label: "未派单", value: "wpd" },
  { label: "派单", value: "pd" },
  { label: "接单", value: "jd" },
  { label: "转单", value: "zd" },
  { label: "完成", value: "wc" },
]

export const orderStatusEnum = {
  wpd: { text: "未派单", status: 'Default' },
  pd: { text: "派单", status: 'Default' },
  jd: { text: "接单", status: 'Processing' },
  zd: { text: "转单", status: 'Default' },
  wc: { text: "完成", status: 'Success' },
}
export interface OrderListSearchType extends PageDataType {
  company: string;//报单单位
  createTimeEnd: string;//创建时间2
  createTimeStart: string;//创建时间1
  customerMobile: string;//客户电话
  customerName: string;//客户姓名
  engineerName: string;//工程师姓名
  orderNo: string;//工单编号
  orderType: string;//工单类型
  receivingTimeEnd: string;//接单时间2
  receivingTimeStart: string;//接单时间1
  sourceType: string;//工单来源
  status: string;//工单状态
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
  // engineerName: string;
  id: number;
  imgUrls: string[];
  // orderNo: string;//工单编号
  // orderType: string;
  portfolioId: string;//档案id
  receivingTime: string;
  // sourceType: string;
  // status: string;
  workDescription: string;
}
