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
}
const BlankLayoutCmp: React.FC<BlankLayout> = ({ children, isLogin, dispatch, loading }) => {
  useEffect(() => {
    if (dispatch && !isLogin) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      dispatch({
        type: 'menu/fetctCurrentMenu'
      })
    }
  }, []);
  return <Spin spinning={ loading }> <InspectorWrapper>{ children }</InspectorWrapper></Spin>
};
// export default Layout
export default connect(({ user, loading }: ConnectState) => ({
  isLogin: !!user.currentUser?.token,
  loading: loading.models.user || loading.effects[ 'menu/fetctCurrentMenu' ] ? true : false
}))(BlankLayoutCmp);
