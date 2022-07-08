import { lazy } from 'react'

const CampusCoordinatorRoutes = [
  {
    path: '/campus-coordinator',
    component: lazy(() => import('../../views/campus-coordinator/dashboard')),
  },
  {
    path: '/campus-coordinator/alumni',
    component: lazy(() => import('../../views/campus-coordinator/alumni')),
  }
]

export default CampusCoordinatorRoutes
