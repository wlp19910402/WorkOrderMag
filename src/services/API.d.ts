export default {
  // 用户管理接口
  USER_LOGIN: '/api/sys/login',
  USER_CURRENT: "/api/user/current",
  USER_LOGOUT: "/api/sys/logout",
  USER_AUTHORITY: '/api/user/authorization',
  USER_LIST: '/api/user/list',
  USER_ADD: '/api/user/add',
  USER_DELETE: '/api/user/del',/// user/del/{id}
  USER_STATUS: '/api/user/status',/// user/status/{id}
  USER_ROLE_ID: '/api/user/role',/// user/role/{id}
  USER_EDIT: '/api/user/edit',// 用户编辑
  // 角色管理接口
  ROLE_LIST: '/api/sys/role/list',
  ROLE_USERID_CHECKID: '/api/sys/role/list',// 角色列表标记指定用户拥有的权限/sys/role/list/{userId}
  ROLE_SAVE: '/api/sys/role/save',
  ROLE_BIND: '/api/sys/role/bind',
  ROLE_GET_MENU: '/api/sys/role/menu',// 绑定权限回显/sys/role/menu/{id}
  ROLE_INFO: '/api/sys/role/detail',/// sys/role/detail/{id}
  ROLE_DELETE: '/api/sys/role/del',// 角色删除/sys/role/del/{id}
  // 菜单管理接口
  MENU_TREE: '/api/sys/menu/tree',// 当前用户菜单【用于用户登录后菜单加载】
  MENU_SAVE: '/api/sys/menu/save',// 添加或编辑菜单
  MENU_CURRENT_TREE: '/api/sys/menu/current/tree',// 当前用户菜单【用于用户登录后菜单加载】
  MENU_DELETE: '/api/sys/menu/del',/// sys/menu/del/{id}
  // 字典管理接口
  DICTIONARY_LIST: '/api/sys/dic/list',
  DICTIONARY_SAVE: '/api/sys/dic/save',
  DICTIONARY_DELETE: '/api/sys/dic/del',/// sys/dic/del/{id}
  DICTIONARY_TYPE: '/api/sys/dic/list',/// sys/dic/list/{type}字典类型查询该字典的数据
  // 上传文件的接口
  UPLOAD_OSS_SIGN: '/api/oss/upload-sign',// 获取上传签名信息
  UPLOAD_FILE: '/api/oss/upload-file',// 文件直传服务
  UPLOAD_STS_SIGN: '/api/oss/sts-sign',// 获取STS签名
  //设备管理-设备管理接口
  DEVICE_LIST: '/api/device/list',
  DEVICE_INFO: '/api/device/info',/// device/info/{id}
  DEVICE_DELETE: '/api/device/del',/// device/del/{id}
  DEVICE_SAVE: '/api/device/save',
  // 耗材管理-设备管理接口
  COMSUMABLE_LIST: '/api/consumable/list',
  COMSUMABLE_INFO: '/api/consumable/info',/// consumable/info/{id}
  COMSUMABLE_DELETE: '/api/consumable/del',/// consumable/del/{id}
  COMSUMABLE_SAVE: '/api/consumable/save',
  // 备件管理-设备管理接口
  PART_LIST: '/api/part/list',
  PART_INFO: '/api/part/info',/// part/info/{id}
  PART_DELETE: '/api/part/del',/// part/del/{id}
  PART_SAVE: '/api/part/save',
  // 安装单位管理-设备档案管理接口
  COMPANY_LIST: '/api/company/list',
  COMPANY_INFO: '/api/company/info',/// company/info/{id}
  COMPANY_DELETE: '/api/company/del',/// company/del/{id}
  COMPANY_SAVE: '/api/company/save',
  // 档案列表管理-设备档案管理接口
  PORTFOLIO_LIST: '/api/portfolio/list',//档案列表查询
  PORTFOLIO_SAVE: '/api/portfolio/add',//
  PORTFOLIO_INFO: '/api/portfolio/info',/// portfolio/info/{id}
  ORTFOLIO_DELETE: '/api/portfolio/del',/// portfolio/del/{id}

}