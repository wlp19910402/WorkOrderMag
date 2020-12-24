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
                name: 'resume',
                icon: 'crown',
                authority: [ 'admin', 'user' ],
                routes: [
                  {
                    path: '/resume/create',
                    name: 'create',
                    icon: 'smile',
                    component: './resume/Create',
                    authority: [ 'admin', 'user' ],
                  },
                  {
                    path: '/resume/list',
                    name: 'list',
                    icon: 'smile',
                    component: './resume/List',
                    authority: [ 'admin', 'user' ],
                  },
                  {
                    path: '/resume/edit/:id',
                    component: './resume/Edit/[id]',
                    authority: [ 'admin', 'user' ],
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
