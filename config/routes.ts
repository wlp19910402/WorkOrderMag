export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/user',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
          {
            name: 'register',
            path: '/user/register',
            component: './user/register',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: [ 'admin', 'user' ],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                authority: [ 'admin' ],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Admin',
                    authority: [ 'admin' ],
                  },
                  {
                    path: '/admin/user',
                    name: 'user',
                    icon: 'smile',
                    component: './admin/UserList',
                    authority: [ 'admin' ],
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './ListTableList',
              },
              {
                path: '/resume',
                name: '简历管理',
                icon: 'crown',
                authority: [ 'admin', 'user' ],
                routes: [
                  {
                    path: '/resume',
                    name: "简历管理",
                    hideInMenu: true,
                    redirect: '/resume/list',
                  },
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
                  },
                  {
                    name: "404",
                    hideInMenu: true,
                    component: './404',
                  },
                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
