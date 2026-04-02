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
          }
        ]
      },
      {
        id: 4,
        name: '数据中心',
        path: '/data',
        component: 'Layout'
      }
    ]
  })
}