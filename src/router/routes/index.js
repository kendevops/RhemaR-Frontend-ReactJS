// ** Routes Imports
import AuthRoutes from './auth'
import MiscRoutes from './misc'
import StudentRoutes from './student'
import ProspectiveStudentRoutes from './prospectiveStudent'

// ** Document title
const BrowserTabTitle = '%s - RHEMA Bible Training Center, Nigeria'

// ** Default Route
const DefaultRoute = '/'

// ** Merge Routes
const Routes = [
  ...AuthRoutes,
  ...MiscRoutes,
  ...StudentRoutes,
  ...ProspectiveStudentRoutes,
]

export { DefaultRoute, BrowserTabTitle, Routes }
