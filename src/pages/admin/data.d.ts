export type UserListDataType = {
  createTime?: string;
  deptId?: number;
  email: string;
  id?: number;
  mobile: string;
  realname?: string;
  status?: string;
  username: string;
}
export type PageDataType = {
  current: number;
  pageSize: number;
}

export type EditUserDataType = {
  email: string,
  mobile: string,
  password?: string,
  realname: string,
  roleIds?: number[],
  username?: string,
  id?: number
}

export type DictionaryDataType = {
  id?: number,
  code: string,
  name: string,
  remark: string,
  type: string,
  value: string
}