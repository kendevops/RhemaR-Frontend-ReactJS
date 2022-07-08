import { lazy } from 'react'

const CampusCoordinatorRoutes = [
  {
    path: '/campus-coordinator/alumni',
    component: lazy(() => import('../../views/campus-coordinator/alumni')),
  },
  {
    path: '/campus-coordinator/chat',
    component: lazy(() => import('../../views/campus-coordinator/chat')),
  },
  {
    path: '/campus-coordinator/events',
    component: lazy(() => import('../../views/campus-coordinator/events')),
  },
  {
    path: '/campus-coordinator/helpdesk',
    component: lazy(() => import('../../views/campus-coordinator/helpdesk')),
  },
  {
    path: '/campus-coordinator/instructors',
    component: lazy(() => import('../../views/campus-coordinator/instructors')),
  },
  {
    path: '/campus-coordinator/messageBoard',
    component: lazy(() => import('../../views/campus-coordinator/messageBoard')),
  },
  {
    path: '/campus-coordinator/profile',
    component: lazy(() => import('../../views/campus-coordinator/profile')),
  },
  {
    path: '/campus-coordinator/students',
    component: lazy(() => import('../../views/campus-coordinator/students')),
  },
  {
    path: '/campus-coordinator/tuitionClearance',
    component: lazy(() => import('../../views/campus-coordinator/tuitionClearance')),
  },
  {
    path: '/campus-coordinator',
    component: lazy(() => import('../../views/campus-coordinator/dashboard'))
  }
]

export default CampusCoordinatorRoutes
