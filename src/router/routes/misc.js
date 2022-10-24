import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const MiscRoutes = [
  {
    path: '/misc/not-authorized',
    component: lazy(() => import('../../views/misc/notAuthorized')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/misc/error',
    component: lazy(() => import('../../views/misc/error')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }
]

export default MiscRoutes
