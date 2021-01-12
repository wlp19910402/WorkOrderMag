import { Reducer, Effect } from 'umi';
import { queryMenuTree, saveMenu, queryCurrentMenu, fetchDelMenu } from '@/services/menu';
import { message } from 'antd';
import { MenuDataType } from '@/pages/admin/Menu/data.d'
export interface MenuModelState {
  currentMenu: MenuDataType[] | [];
  menuTree: MenuDataType[] | [];
  flatMenuData: MenuDataType[] | [];
}
const welcome = {
  children: [],
  icon: "icon-gift2",
  id: 118,
  name: "欢迎页",
  orderNum: 1,
  parentId: 0,
  perms: "",
  type: 1,
  url: "/welcome",
}
const defaulState = {
  currentMenu: [],
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
    delMenu: Effect;
    clearMenu: Effect;
  };
  reducers: {
    changeCurrentMenu: Reducer<MenuModelState>;
    changeMenuTree: Reducer<MenuModelState>;
  };
}

const Model: MenuModelType = {
  namespace: 'menu',
  state: defaulState,
  effects: {
    //获取菜单列表
    *fetchMenuTree ({ callback }, { call, put }) {
      const response = yield call(queryMenuTree);
      if (response.code === 0) {
        yield put({
          type: 'changeMenuTree',
          payload: response.data
        })
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
      } else {
        message.error(response.message);
      }
    },
    //保存菜单
    *saveMenu ({ payload, callback }, { call, put }) {
      const response = yield call(saveMenu, payload)
      if (response.code === 0) {
        if (callback) callback(response)
        message.success("保存成功！");
      } else {
        message.error(response.message);
      }
    },
    *delMenu ({ payload, callback }, { call }) {
      const response = yield call(fetchDelMenu, payload);
      if (response.code === 0) {
        if (callback) callback(response)
        message.success("删除成功！");
      } else {
        message.error(response.message);
      }
    },
    //当前用户菜单
    *fetctCurrentMenu (_, { put, call }) {
      let response = yield call(queryCurrentMenu);
      let menuData = response.data
      if (response.code === 0) {
        yield put({
          type: 'changeCurrentMenu',
          payload: [ welcome, ...menuData ]
        });
      } else {
        // message.error(response.message);
      }
    },
    *clearMenu (_, { put }) {
      yield put({
        type: 'changeCurrentMenu',
        payload: []
      });
      yield put({
        type: 'changeMenuTree',
        payload: []
      })
    }
  },
  reducers: {
    changeCurrentMenu (state = defaulState, { payload }) {
      return {
        ...state,
        currentMenu: payload
      };
    },
    changeMenuTree (state = defaulState, { payload }) {
      return {
        ...state,
        menuTree: payload
      }
    }
  },
};

export default Model;
