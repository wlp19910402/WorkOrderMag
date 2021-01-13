import { stringify } from 'querystring';
import { history, Reducer, Effect } from 'umi';
import { fakeAccountLogin, fackAccountToken, fackLogout, saveUserAuthority } from '@/services/user';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import localforage from 'localforage';
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
  },
  effects: {
    //登录
    *login ({ payload, callback }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      if (!response) return
      yield put({
        type: 'changeCurrentUser',
        payload: response.data,
      });
      localforage.setItem('token', response.data.token)
      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      message.success('🎉 🎉 🎉  登录成功！');
      let { redirect } = params as { redirect: string };
      callback()
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          history.replace('/welcome');
          return;
        }
      }
      history.replace(redirect || '/welcome');
    },
    //使用token获取用户信息
    *fetchCurrent ({ callback }, { call, put }) {
      const response = yield call(fackAccountToken);
      if (!response) {
        callback(false)
        if (window.location.pathname !== '/user/login' && !redirect) {
          history.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          });
        }
        history.replace('/user/login');
        return
      }
      yield put({
        type: 'changeCurrentUser',
        payload: response.data,
      });
      const { redirect } = getPageQuery();
      localforage.setItem('token', response.data.token)
      if (window.location.pathname === '/user/login') {
        if (redirect) {
          window.location.href = redirect.toString()
        } else {
          history.replace('/')
        }
      }
      callback(true)
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
    }
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
        currentUser: {}
      }
    }
  },
};

export default Model;
