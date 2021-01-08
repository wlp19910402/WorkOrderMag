import { Reducer, Effect } from 'umi';
import { queryMenuTree, saveMenu, queryCurrentMenu } from './service';
import { message } from 'antd';
import { MenuDataType } from './data.d'
export interface MenuModelState {
  currentMenu: MenuDataType | undefined;
  menuTree: MenuDataType[] | [];
  flatMenuData: MenuDataType[] | [];
}
const defaulState = {
  currentMenu: undefined,
  menuTree: [],
  flatMenuData: []
}
const fetchFaltMenuData: MenuDataType[] | [] = (menuData: MenuDataType[] | []) => {
  let tmpArr: MenuDataType[] | [] = [];
  const fn = (data: MenuDataType[]) => {
    if (data.length > 0) {
      data?.forEach(item => {
        tmpArr.push(item)
        if (item.children?.length > 0) {
          fn(item.children)
        }
      })
    }
  }
  fn(menuData)
  return tmpArr;
}
export interface MenuModelType {
  namespace: string;
  state: MenuModelState;
  effects: {
    fetchMenuTree: Effect;
    saveMenu: Effect;
    fetctCurrentMenu: Effect;
  };
  reducers: {
    changeMenuTree: Reducer<MenuModelState>;
    changeCurrentMenu: Reducer<MenuModelState>;
  };
}

const Model: MenuModelType = {
  namespace: 'menu',
  state: defaulState,
  effects: {
    //获取菜单列表
    *fetchMenuTree ({ callback }, { call, put }) {
      const response = yield call(queryMenuTree);
      const menuData = [
        {
          "icon": "icon-FolderOpen",
          "name": "一级菜单",
          "id": 0,
          "url": "#",
          "type": 0,
          "perms": "",
          "orderNum": 0,
          "parentId": 0,
          "children": response.data
        }
      ]
      const flatMenuData = fetchFaltMenuData(menuData)
      if (callback) callback(menuData, flatMenuData)
    },
    //保存菜单
    *saveMenu ({ payload, callback }, { call, put }) {
      const response = yield call(saveMenu, payload)
      if (callback) callback(response)
    },
    //当前用户菜单
    *fetctCurrentMenu (_, { put, call }) {
      yield call(queryCurrentMenu);
      yield put({
        type: 'changeCurrentMenu'
      });
    },
  },
  reducers: {
    changeCurrentMenu (state = defaulState, { payload }) {
      return {
        ...state,
        currentMenu: payload
      };
    },
    changeMenuTree (state = defaulState, { payload }) {
      return ({
        ...state,
        menuTree: payload.menuTree,
        flatMenuData: payload.faltData
      })
    },
  },
};

export default Model;
