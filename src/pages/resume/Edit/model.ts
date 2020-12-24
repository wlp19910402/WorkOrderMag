import { Effect, Subscription } from 'umi';
import { queryResumeDetail } from './service';
import { match } from 'react-router'

import { ResumeDataType, resumeDataDefault } from '../API.d'
export interface ModelType {
  namespace: string;
  state: string;
  effects: {
    fetch: Effect;
  }
  subscriptions?: {
    subPush: Subscription;
  };
}
const Model: ModelType = {
  namespace: 'resumeDetail',
  state: "",
  effects: {
    *fetch ({ payload, callback }, { call }) {
      const response = yield call(queryResumeDetail, payload);
      if (response.respCode === "000000") {
        callback(response.data[ 0 ])
      }

    },
  },
  // subscriptions: {
  //   subPush ({ dispatch }) {
  //     dispatch({
  //       type: 'resumeDetail',
  //       payload: { id: "1" },
  //       callback: (res: ResumeDataType) => {
  //       }
  //     });
  //   }
  // }
}
export default Model;
