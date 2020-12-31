import React, { useEffect } from 'react';
import { Inspector } from 'react-dev-inspector';
import { ConnectState } from '@/models/connect';
import { connect, Dispatch, ConnectProps } from 'umi';
const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;
interface BlankLayout extends ConnectProps {
  children: React.ReactNode;
  isLogin: boolean;
  dispatch: Dispatch;
}
const Layout: React.FC<BlankLayout> = ({ children, isLogin, dispatch }) => {
  useEffect(() => {
    if (dispatch && !isLogin) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);
  return <InspectorWrapper>{ children }</InspectorWrapper>;
};
// export default Layout
export default connect(({ user }: ConnectState) => ({
  isLogin: !!user.currentUser?.token
}))(Layout);
