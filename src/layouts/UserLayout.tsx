import { DefaultFooter, MenuDataItem, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, SelectLang, useIntl, ConnectProps, connect, Dispatch } from 'umi';
import React, { useEffect } from 'react';
import { ConnectState } from '@/models/connect';
import logo from '../assets/logo.svg';
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
                <span className={ styles.title }>Home-D</span>
              </Link>
            </div>
            <div className={ styles.desc }>
              Home-D resume模板，优化，简洁，清晰。开始您的resume
            </div>
          </div>
          { children }
        </div>
        {/* <DefaultFooter copyright={ `${new Date().getFullYear()} Home-D` }
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
