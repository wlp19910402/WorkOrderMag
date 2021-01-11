import request from 'umi-request';
import { MenuDataType } from '@/pages/admin/Menu/data.d';
import API from '@/services/API.d'

export const queryMenuTree = async () => {
  return await request.post(API.MENU_TREE);
}
export const saveMenu = async (params: MenuDataType) => {
  return await request.post(API.MENU_SAVE, { data: params });
}
export const queryCurrentMenu = async () => {
  return await request.post(API.MENU_CURRENT_TREE);
}

export const fetchDelMenu = async (id: string) => {
  return await request.post(API.MENU_DEL_ID + '/' + id);
}