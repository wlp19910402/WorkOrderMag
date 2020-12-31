import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import { fakeAccountLogin, fackAccountToken, fetchImgCaptcha, fackLogout } from '@/services/login';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import localforage from 'localforage'
export interface UserStateType {
  id?: number;
  email?: string;
  username?: string;
  state?: number;
  mobile?: string;
  realname?: string;
  token?: string;
}
export interface UserModelState {
  currentUser?: UserStateType;
  menu?: boolean;
}
export interface LoginModelType {
  namespace: string;
  state: UserModelState;
  effects: {
    login: Effect;
    logout: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    changeCurrentUser: Reducer<UserModelState>;
    clearUser: Reducer<UserModelState>;
  };
}

const Model: LoginModelType = {
  namespace: 'user',
  state: {
    currentUser: {},
    menu: true
  },
  effects: {
    //登录
    *login ({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeCurrentUser',
        payload: response.data,
      });
      if (response.code === 0) {
        localforage.setItem('token', response.data.token)
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      } else {
        message.error(response.msg);
      }
    },
    //使用token获取用户信息
    *fetchCurrent (_, { call, put }) {
      const response = yield call(fackAccountToken);
      yield put({
        type: 'changeCurrentUser',
        payload: response.data,
      });
      const { redirect } = getPageQuery();
      if (response.code === 0) {
        localforage.setItem('token', response.data.token)
        message.success('🎉 🎉 🎉  登录成功！token');
        if (window.location.pathname === '/user/login') {
          if (redirect) {
            window.location.href = redirect.toString()
          } else {
            history.replace('/')
          }
        }
      } else {
        if (window.location.pathname !== '/user/login' && !redirect) {
          history.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
        history.replace('/user/login');
      }
    },
    //退出
    *logout (_, { put, call }) {
      const { redirect } = getPageQuery();
      yield call(fackLogout);
      yield put({
        type: 'clearUser'
      });
      localforage.removeItem('token').then(token => {
        if (window.location.pathname !== '/user/login' && !redirect) {
          history.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
      })
    },
  },
  reducers: {
    changeCurrentUser (state, { payload }) {
      return {
        ...state,
        currentUser: payload || {},
      };
    },
    clearUser () {
      return {
        currentUser: {},
        menu: true
      }
    }
  },
};

export default Model;
