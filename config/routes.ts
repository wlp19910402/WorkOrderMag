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
          },
          {
            path: "*",
            component: './404',
          },
        ]
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
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
                  },
                  {
                    path: '/admin/dictionary',
                    name: '系统字典',
                    component: "./admin/Dictionary"
                  },
                  {
                    path: "*",
                    component: './404',
                  }
                ]
              },
              {
                path: '/device',
                name: '设备管理',
                icon: 'smile',
                routes: [
                  {
                    path: '/device/list',
                    name: "设备管理",
                    component: './device/Device'
                  },
                  {
                    path: '/device/consumable',
                    name: "耗材管理",
                    component: './device/Consumable'
                  },
                  {
                    path: '/device/part',
                    name: "备件管理",
                    component: './device/Part'
                  },
                  {
                    path: "*",
                    component: './404',
                  }
                ]
              },
              {
                path: '/archive',
                name: '设备档案管理',
                icon: 'smile',
                routes: [
                  {
                    path: '/archive/company',
                    name: "安装单位管理",
                    component: './archive/Company'
                  },
                  {
                    path: '/archive/portfolio',
                    name: "设备档案管理",
                    routes: [
                      {
                        path: '/archive/portfolio/',
                        redirect: '/archive/portfolio/list',
                      },
                      {
                        path: '/archive/portfolio/list',
                        name: "设备档案管理",
                        component: './archive/portfolio/List/index',
                      },
                      {
                        path: '/archive/portfolio/create',
                        name: "设备档案新增",
                        component: './archive/portfolio/Create/index',
                      }, {
                        path: '/archive/portfolio/edit/:id',
                        name: "设备档案编辑",
                        component: './archive/portfolio/Edit/[id]',
                      }, {
                        path: '/archive/portfolio/info/:id',
                        name: "详情",
                        component: './archive/portfolio/Info/[id]',
                      },
                      {
                        path: "*",
                        component: './404',
                      },
                    ]
                  },
                  {
                    path: "*",
                    component: './404',
                  },
                ]
              },
              {
                path: '/workOrder',
                name: '工单管理',
                icon: 'smile',
                routes: [
                  {
                    path: '/workOrder/addOrder',
                    name: "接单",
                    component: './workOrder/AddOrder'
                  },
                  {
                    path: "*",
                    component: './404',
                  },
                ]
              },
              {
                name: "exception",
                path: "/exception",
                routes: [
                  {
                    path: "/index.html",
                    redirect: "/exception/403",
                    "exact": true
                  },
                  {
                    "path": "/",
                    "redirect": "/exception/403",
                    "exact": true
                  },
                  {
                    name: "403",
                    path: "/exception/403",
                    component: './exception/403',
                    exact: true
                  },
                  {
                    "name": "404",
                    "path": "/exception/404",
                    "component": './exception/404',
                    "exact": true
                  },
                  {
                    "name": "500",
                    "path": "/exception/500",
                    "component": './exception/500',
                    "exact": true
                  },
                  {
                    path: "*",
                    component: './404',
                  },
                ]
              },
              {
                path: "*",
                component: './404',
              },
            ]
          },
          {
            component: './404',
          },
        ]
      }
    ]
  },
  {
    component: './404',
  },
];
