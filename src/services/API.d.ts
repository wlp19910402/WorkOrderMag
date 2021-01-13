export default {
  //用户管理接口
  USER_LOGIN: '/api/sys/login',
  USER_CURRENT: "/api/user/current",
  USER_LOGOUT: "/api/sys/logout",
  USER_AUTHORITY: '/api/user/authorization',
  USER_LIST: '/api/user/list',
  USER_ADD: '/api/user/add',
  USER_DELETE: '/api/user/del',///user/del/{id}
  USER_STATUS: '/api/user/status',///user/status/{id}
  USER_ROLE_ID: '/api/user/role',///user/role/{id}
  USER_EDIT: '/api/user/edit',//用户编辑
  //角色管理接口
  ROLE_LIST: '/api/sys/role/list',
  ROLE_USERID_CHECKID: '/api/sys/role/list',//角色列表标记指定用户拥有的权限/sys/role/list/{userId}
  ROLE_SAVE: '/api/sys/role/save',
  ROLE_BIND: '/api/sys/role/bind',
  ROLE_GET_MENU: '/api/sys/role/menu',//绑定权限回显/sys/role/menu/{id}
  ROLE_DETAIL: '/api/sys/role/detail',///sys/role/detail/{id}
  ROLE_DELETE: '/api/sys/role/del',//角色删除/sys/role/del/{id}
  //菜单管理接口
  MENU_TREE: '/api/sys/menu/tree',//当前用户菜单【用于用户登录后菜单加载】
  MENU_SAVE: '/api/sys/menu/save',//添加或编辑菜单
  MENU_CURRENT_TREE: '/api/sys/menu/current/tree',//当前用户菜单【用于用户登录后菜单加载】
  MENU_DELETE: '/api/sys/menu/del',///sys/menu/del/{id}
  //字典管理接口
  DICTIONARY_LIST: '/api/sys/dic/list',
  DICTIONARY_SAVE: '/api/sys/dic/save',
  DICTIONARY_DELETE: '/api/sys/dic/del',///sys/dic/del/{id}
  //设备管理-设备管理接口
  DEVICE_LIST: '/api/device/list',
  DEVICE_DETAIL: '/api/device/info',///device/info/{id}
  DEVICE_DELETE: '/api/device/del',///device/del/{id}
  DEVICE_SAVE: '/api/device/save',
}