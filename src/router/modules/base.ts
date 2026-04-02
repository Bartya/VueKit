import Layout from '@/layouts/index.vue'

export const baseRoutes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
//   {
//     path: '/login',
//     name: 'login',
//     component: () => import('@/views/login/index.vue')
//   }
]