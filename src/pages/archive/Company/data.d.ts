import { PageDataType } from '../data.d'
// 公司管理查询搜索的
export type CompanySearchType = {
  company?: string;// 公司名称
  contactMobile?: string;// 联系电话
  contactUser?: string;// 联系人
  no?: string;// 公司编号
} & PageDataType
// 公司保存
export type CompanySaveDataType = {
  company: string;
  id?: number;
  contactMobile: string;// 图片
  contactUser: string;// 联系人
  no: string;// 公司编号
  remark: string;//备注
}
// 公司详情
export type CompanyListDataType = {
  createTime: string;// 创建日期
  createUser: number;// 创建人
  updateTime: string;// 修改时间
  updateUser: number;// 修改人
  createUsername: string;
  updateUsername: string;
} & CompanySaveDataType

