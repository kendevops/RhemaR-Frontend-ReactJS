import { lazy } from 'react'

const ProspectiveStudentRoutes = [
  {
    path: '/application',
    component: lazy(() => import('../../views/prospective-student/application')),
  }
]

export default ProspectiveStudentRoutes
