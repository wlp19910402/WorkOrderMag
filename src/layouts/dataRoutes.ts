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
    name: '管理',
    icon: 'crown',
    authority: [ 'admin' ],
    routes: [
      {
        path: '/admin/sub-page',
        name: '二级管理',
        icon: 'smile',
        component: './Admin',
        authority: [ 'admin' ],
      },
      {
        path: '/admin/user',
        name: '用户管理',
        icon: 'smile',
        component: './admin/UserList',
        authority: [ 'admin' ],
      }
    ]
  },
  {
    name: '查询表格',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },
  {
    name: "系统管理",
    icon: "table",
    path: '/sys',
    authority: [ 'admin', 'user' ],
    routes: [
      {
        name: "菜单管理",
        path: "/sys/menuManager",
        component: './sys/Menu',
        authority: [ 'admin', 'user' ],
      },
      {
        name: "角色管理",
        path: "/sys/roleManager",
        component: './sys/Menu',
        authority: [ 'admin', 'user' ],
      }
    ]
  },
  {
    path: '/resume',
    name: '简历管理',
    icon: 'crown',
    redirect: '/resume/list',
    authority: [ 'admin', 'user' ],
    routes: [
      {
        path: '/resume/create',
        name: "新增",
        hideInMenu: true,
        icon: 'smile',
        component: './resume/Create',
        authority: [ 'admin', 'user' ],
      },
      {
        path: '/resume/list',
        icon: 'smile',
        name: "列表",
        hideInMenu: true,
        component: './resume/List',
        authority: [ 'admin', 'user' ],
      },
      {
        path: '/resume/edit/:id',
        name: "编辑",
        hideInMenu: true,
        component: './resume/Edit/[id]',
        authority: [ 'admin', 'user' ],
      },
      {
        path: '/resume/detail/:id',
        name: "详情",
        hideInMenu: true,
        component: './resume/Detail/[id]',
        authority: [ 'admin', 'user' ],
      }
    ],
  },
  {
    component: './404',
  },
]
