import { lazy } from 'react'

const StudentRoutes = [
  {
    path: '/dashboard',
    component: lazy(() => import('../../views/student/dashboard')),
  },
  {
    path: '/student/courses',
    component: lazy(() => import('../../views/student/dashboard')),
  }
]

export default StudentRoutes
