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