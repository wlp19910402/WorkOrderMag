import { Effect, Reducer } from 'umi';

import { BaseInfoDataType } from '../API.d';
import { queryFakeList } from './service';
const baseInfoData: BaseInfoDataType = {
  key: "782",
  name: "wlp",
  sex: '女',
  nativePlace: "西安",
  residencePlace: "北京市北京城市昌平区",
  ethnic: "汉",
  email: "wlp6897@163.com",
  phone: "15701578892",
  dateBirth: "1991/04/02",
  education: "本科",
  headerImgUrl: require('@/assets/images/header-avatar.png'),
  jobIntention: "Java工程师",
  salaryExpectation: "15-20k",
  yearsWork: "8年",
}
export interface StateType {
  list: BaseInfoDataType[];
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
  };
  reducers: {
    queryList: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'listAndcardList',
  state: {
    list: [
      { ...baseInfoData, key: "1" },
      { ...baseInfoData, key: "2" },
      { ...baseInfoData, key: "3" },
      { ...baseInfoData, key: "4" },
      { ...baseInfoData, key: "5" }
    ],
  },
  effects: {
    *fetch ({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
    },
  },

  reducers: {
    queryList (state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};

export default Model;
