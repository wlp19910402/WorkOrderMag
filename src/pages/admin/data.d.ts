export interface UserListDataType {
  createTime?: string;
  deptId?: number;
  email: string;
  id?: number;
  mobile: string;
  realname?: string;
  status?: string;
  username: string;
}
export interface PageDataType {
  current: number;
  pageSize: number;
}

export interface EditUserDataType {
  email: string,
  mobile: string,
  password: string,
  realname: string,
  roleIds: number[],
  username: string
}