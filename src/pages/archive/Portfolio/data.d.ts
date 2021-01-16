import { PageDataType } from '../data.d'
// 设备档案管理查询搜索的
export type PortfolioSearchType = {
  no?: string;//档案编号
  model?: string;//设备型号
  type?: string;//设备类型
  brand?: string;//设备品牌
  companyName?: string;//单位名称
  deviceName?: string;//设备名称
  qrCodde?: string;//二维码code
} & PageDataType
// 设备档案保存
export type PortfolioSaveDataType = {
  brand: string;// 品牌
  companyId: number;//单位id；
  companyName: string;//单位名称；
  deviceId: number;//设备id;
  deviceName: string;//设备名称
  installLocation: string;//安装位置
  installTime: string;//安装时间
  qrCodde: string;//二维码code
  warrantyPeriod: string;//保修周期
  id?: number;// 主键
  model: string;// 设备型号
  type: string;// 设备类型
}
// 设备详情
export type PortfolioListDataType = {
  createTime: string;// 创建日期
  createUser: number;// 创建人
  updateTime: string;// 修改时间
  updateUser: number;// 修改人
  createUsername: string;
  updateUsername: string;
  brandName: string;
  modelName: string;
  typeName: string;// 设备类型
  imgUrls: string[];
  no: string;//档案编号
} & DeviceSaveDataType