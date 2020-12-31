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

export const userListDataDefault: UserListDataType = {
  username: "",
  mobile: ""
}
export interface EditUserDataType {
  email: string,
  mobile: string,
  password: string,
  realName: string,
  roleIds: number[],
  username: string
}