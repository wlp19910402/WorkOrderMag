import React, { useEffect } from 'react';
import { Inspector } from 'react-dev-inspector';
import { ConnectState } from '@/models/connect';
import { Spin } from 'antd';
import { connect, Dispatch, ConnectProps } from 'umi';
const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;
interface BlankLayout extends ConnectProps {
  children: React.ReactNode;
  isLogin: boolean;
  dispatch: Dispatch;
  loading: boolean;
  token: string | undefined;
}
const BlankLayoutCmp: React.FC<BlankLayout> = ({ children, isLogin, dispatch, loading, token }) => {
  useEffect(() => {
    if (!token && dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
        callback: (res: boolean) => {
          res && dispatch({
            type: 'menu/fetctCurrentMenu'
          })
          !res && dispatch({
            type: 'user/logout'
          })
        }
      });
    }
  }, []);
  return <Spin spinning={ false }><InspectorWrapper>{ children }</InspectorWrapper></Spin>
};

export default connect(({ user, loading }: ConnectState) => ({
  token: user.currentUser?.token,
  loading: loading.models.user || loading.effects[ 'menu/fetctCurrentMenu' ] ? true : false
}))(BlankLayoutCmp)
