import { Effect, Reducer } from 'umi';

import { ResumeDataType } from '../API.d';
import { queryFakeList } from './service';
export interface StateType {
  list: ResumeDataType[];
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
    list: [],
  },
  effects: {
    *fetch ({ }, { call, put }) {
      const response = yield call(queryFakeList);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
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
