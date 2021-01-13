export interface PageDataType {
  current: number;
  pageSize: number;
}
//设备管理查询搜索的
export interface DeviceSearchType extends PageDataType {
  name?: string;
  no?: string;
  specification?: string;
  type?: string;
}
//设备保存
export interface DeviceSaveDataType {
  brand: string;//品牌
  description: string;//设备描述
  id?: number;//主键
  imgUrls: string[];//图片
  name: string[];//设备名称
  no: string;//设备编号
  specification: string;//规格
  type: string;//设备类型
  warrantyPeriod: string;//保修周期
}
//设备详情
export interface DeviceListDataType extends DeviceSaveDataType {
  createTime: string;//创建日期
  createUser: number;//创建人
  updateTime: string;//修改时间
  updateUser: number;//修改人
}