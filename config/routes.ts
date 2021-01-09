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
            name: '登录',
            path: '/user/login',
            component: './Login',
          }
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
                    path: '/admin/user',
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
