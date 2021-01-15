export type PageDataType = {
  current: number;
  pageSize: number;
}
// 设备管理查询搜索的
export type ConsumableSearchType = {
  name?: string;//备件名称
  no?: string;//编号
  type?: string;//备件类型
} & PageDataType