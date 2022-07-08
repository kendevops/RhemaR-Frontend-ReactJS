import { lazy } from 'react'

const CampusCoordinatorRoutes = [
  {
    path: '/campus-coordinator',
    component: lazy(() => import('../../views/campus-coordinator/dashboard')),
  },
//   {
//     path: '/student/courses',
//     component: lazy(() => import('../../views/student/dashboard')),
//   }
]

export default CampusCoordinatorRoutes
