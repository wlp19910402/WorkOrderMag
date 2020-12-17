import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, ConnectProps, connect } from 'umi';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import defaultAvatar from '@/assets/images/header-avatar.png'
export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  currentUser?: CurrentUser;
  isLogin?: boolean;
}

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;
    if (key === 'logout') {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      return;
    }

    history.push(`/account/${key}`);
  };

  render (): React.ReactNode {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      isLogin = false
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={ styles.menu } selectedKeys={ [] } onClick={ this.onMenuClick }>
        {isLogin && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        ) }
        {isLogin && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        ) }
        {isLogin && <Menu.Divider /> }
        {isLogin && (
          <Menu.Item key="logout">
            <LogoutOutlined />
            退出登录
          </Menu.Item>
        ) }
        {!isLogin && (
          <Menu.Item key="logout">
            <LogoutOutlined />
            去登录
          </Menu.Item>
        ) }
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={ menuHeaderDropdown }>
        <span className={ `${styles.action} ${styles.account}` }>
          <Avatar size="small" className={ styles.avatar } src={ isLogin ? currentUser.avatar : defaultAvatar } alt="avatar" />
          <span className={ `${styles.name} anticon` }>{ isLogin ? currentUser.name : "游客" }</span>
        </span>
      </HeaderDropdown>
    ) : (
        <span className={ `${styles.action} ${styles.account}` }>
          <Spin
            size="small"
            style={ {
              marginLeft: 8,
              marginRight: 8,
            } }
          />
        </span>
      );
  }
}

export default connect(({ user, login }: ConnectState) => ({
  currentUser: user.currentUser,
  isLogin: login.currentAuthority === 'admin' || login.currentAuthority === 'user'
}))(AvatarDropdown);
