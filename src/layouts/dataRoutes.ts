interface routerDataType {
  path: string,
  name?: string,
  icon?: string,
  component?: string,
  authority?: string[] | undefined,
  routes?: routerDataType[],
}
export default <routerDataType[] > [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: '欢迎页',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: '系统管理',
    icon: 'smile',
    routes: [
      {
        path: '/admin/list',
        name: "用户列表",
        component: './admin/UserList'
      },
      {
        path: '/admin/menu',
        name: '菜单管理',
        component: "./admin/Menu"
      },
      {
        path: '/admin/role',
        name: '角色管理',
        component: "./admin/Role"
      }
    ]
  },
  {
    component: './404',
  },
]
