import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps } from 'umi';
import { stringify } from 'querystring';
import { ConnectState } from '@/models/connect';
import { UserStateType } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: UserStateType;
  isLogin?: boolean
}

interface SecurityLayoutState {
  isReady: boolean;
}
class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };
  componentDidMount () {
    this.setState({
      isReady: true,
    })
  }
  render () {
    const { isReady } = this.state;
    const { children, loading, isLogin } = this.props;
    const queryString = stringify({
      redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={ `/user/login?${queryString}` } />;
    }
    return children;
  }
}

export default connect(({ user, loading, }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
  isLogin: !!user.currentUser?.token
}))(SecurityLayout);
