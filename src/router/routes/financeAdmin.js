import { lazy } from 'react'

const FinanceAdminRoutes = [
  {
    path: '/finance-admin/chat',
    component: lazy(() => import('../../views/finance-admin/chat')),
  },
  {
    path: '/finance-admin/event',
    component: lazy(() => import('../../views/finance-admin/event')),
  },
  {
    path: '/finance-admin/helpdesk',
    component: lazy(() => import('../../views/finance-admin/helpdesk')),
  },
  {
    path: '/finance-admin/profile',
    component: lazy(() => import('../../views/finance-admin/profile')),
  },
  {
    path: '/finance-admin/report',
    component: lazy(() => import('../../views/finance-admin/report')),
  },
  {
    path: '/finance-admin/tuitionClearance',
    component: lazy(() => import('../../views/finance-admin/tuitionClearance')),
  },
  {
    path: '/finance-admin/dashboard',
    component: lazy(() => import('../../views/finance-admin/dashboard')),
  }
]

export default FinanceAdminRoutes
