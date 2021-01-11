export default {
  USER_LOGIN: '/api/sys/login',
  USER_CURRENT: "/api/user/current",
  USER_LOGOUT: "/api/sys/logout",
  USER_AUTHORITY: '/api/user/authorization',
  ROLE_LIST: '/api/sys/role/list',
  ROLE_SAVE: '/api/sys/role/save',
  ROLE_BIND: '/api/sys/role/bind',
  MENU_TREE: '/api/sys/menu/tree',//当前用户菜单【用于用户登录后菜单加载】
  MENU_SAVE: '/api/sys/menu/save',//添加或编辑菜单
  MENU_CURRENT_TREE: '/api/sys/menu/current/tree',//当前用户菜单【用于用户登录后菜单加载】
  MENU_DEL_ID: '/api/sys/menu/del',///sys/menu/del/{id}
}