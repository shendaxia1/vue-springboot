/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'table'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/table/dynamicTable/index'),
      name: 'DynamicTable',
      meta: { title: 'dynamicTable' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/dragTable'),
      name: 'DragTable',
      meta: { title: 'dragTable' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inlineEditTable'),
      name: 'InlineEditTable',
      meta: { title: 'inlineEditTable' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complexTable'),
      name: 'ComplexTable',
      meta: { title: 'complexTable' }
    },
    {
      path: 'role-table',
      component: () => import('@/views/table/roleTable'),
      name: '角色管理',
      meta: { title: '角色管理' }
    }
  ]
}
export default tableRouter
