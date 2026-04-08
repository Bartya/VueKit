export function getMenuAPI() {
  return Promise.resolve({
    code: 200,
    data: [
      {
        id: 1,
        name: '系统管理',
        path: '/system',
        component: 'Layout',
        children: [
          {
            id: 2,
            name: '用户管理',
            path: '/system/user',
            component: 'system/user/index'
          },
          {
            id: 3,
            name: '角色管理',
            path: '/system/role',
            component: 'system/role/index'
          },
          {
            id: 4,
            name: '菜单管理',
            path: '/system/menu',
            component: 'system/menu/index'
          }
        ]
      },

      {
        id: 10,
        name: '数据中心',
        path: '/data',
        component: 'Layout',
        children: [
          {
            id: 11,
            name: '数据报表',
            path: '/data/report',
            component: 'data/report/index'
          },
          {
            id: 12,
            name: '数据分析',
            path: '/data/analysis',
            component: 'data/analysis/index'
          }
        ]
      },

      {
        id: 20,
        name: '监控管理',
        path: '/monitor',
        component: 'Layout',
        children: [
          {
            id: 21,
            name: '在线用户',
            path: '/monitor/online',
            component: 'monitor/online/index'
          },
          {
            id: 22,
            name: '日志管理',
            path: '/monitor/log',
            component: 'monitor/log/index',
            children: [
              {
                id: 23,
                name: '操作日志',
                path: '/monitor/log/operate',
                component: 'monitor/log/operate'
              },
              {
                id: 24,
                name: '登录日志',
                path: '/monitor/log/login',
                component: 'monitor/log/login'
              }
            ]
          }
        ]
      },
      {
        id: 30,
        name: '多级菜单测试',
        path: '/multi',
        component: 'Layout',
        children: [
          {
            id: 31,
            name: '一级菜单',
            path: '/multi/level1',
            component: 'multi/level1',
            children: [
              {
                id: 32,
                name: '二级菜单',
                path: '/multi/level1/level2',
                component: 'multi/level2',
                children: [
                  {
                    id: 33,
                    name: '三级菜单',
                    path: '/multi/level1/level2/level3',
                    component: 'multi/level3'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  })
}