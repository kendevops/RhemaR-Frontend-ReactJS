import { lazy } from 'react'

const StudentRoutes = [
  {
    path: '/student/dashboard',
    component: lazy(() => import('../../views/student/dashboard')),
  },
  {
    path: '/student/tuition-clearance',
    component: lazy(() => import('../../views/student/tuition-clearance')),
  }
]

export default StudentRoutes
