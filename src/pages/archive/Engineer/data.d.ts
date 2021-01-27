// 单位管理查询搜索的
export type EngineerSearchType = {
  current: number;
  pageSize: number;
  engineerMobile?: string;// 工程手机号
  engineerName?: string;// 工程师姓名
  roleName?: string;// 工程师角色: role_engineer 微信工程师,可用值:role_engineer
  status?: number;// 状态：0不可用，1可用
}

// 单位详情
export type EngineerListDataType = {
  engineerMobile: string;// 工程手机号
  engineerName: string;// 工程师姓名
  roleName: string;// 工程师角色: role_engineer 微信工程师,可用值:role_engineer
  id: number;// 状态：0不可用，1可用
}

