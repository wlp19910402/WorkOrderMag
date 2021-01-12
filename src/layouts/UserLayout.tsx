import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, ConnectProps, connect, Dispatch } from 'umi';
import React, { useEffect } from 'react';
import { ConnectState } from '@/models/connect';
import logo from '../assets/images/logo-white.png';
import styles from './UserLayout.less';

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [ path: string ]: MenuDataItem;
  };
  dispatch: Dispatch;
  isLogin: boolean;
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
    isLogin,
    dispatch
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { formatMessage } = useIntl();
  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    formatMessage,
    breadcrumb,
    ...props,
  });
  // useEffect(() => {
  //   if (dispatch && !isLogin) {
  //     dispatch({
  //       type: 'user/fetchCurrent'
  //     })
  //   }
  // }, [])
  return (
    <HelmetProvider>
      <Helmet>
        <title>{ title }</title>
        {/* <meta name="description" content={ title } /> */ }
      </Helmet>

      <div className={ styles.container }>
        <div className={ styles.lang }>
          <SelectLang />
        </div>
        <div className={ styles.content }>
          <div className={ styles.top }>
            <div className={ styles.header }>
              <Link to="/">
                <img alt="logo" className={ styles.logo } src={ logo } />
              </Link>
            </div>
            <div className={ styles.desc }>
              设备管理管理端
            </div>
          </div>
          { children }
        </div>
        {/* <DefaultFooter copyright={ `${new Date().getFullYear()} 凌云博际` }
          links={ false } /> */}
      </div>
    </HelmetProvider>
  );
};

export default connect(
  (
    { settings, user }: ConnectState,
  ) => ({ ...settings, isLogin: !!user.currentUser?.token })
)(UserLayout);
