// ** Routes Imports
import MiscRoutes from './misc'
import StudentRoutes from './student'
import ProspectiveStudentRoutes from './prospectiveStudent'
import CampusCoordinatorRoutes from './campusCoordinator'

// ** Document title
const BrowserTabTitle = '%s - RHEMA Bible Training Center, Nigeria'

// ** Default Route
const DefaultRoute = '/'

// ** Merge Routes
const Routes = [
  ...MiscRoutes,
  ...StudentRoutes,
  ...ProspectiveStudentRoutes,
  ...CampusCoordinatorRoutes,
]

export { DefaultRoute, BrowserTabTitle, Routes }
