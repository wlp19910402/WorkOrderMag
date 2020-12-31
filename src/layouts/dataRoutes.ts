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
    name: '用户管理',
    icon: 'smile',
    routes: [
      {
        path: '/admin/list',
        name: "用户列表",
        component: './admin/UserList'
      }
    ]
  },
  {
    component: './404',
  },
]
