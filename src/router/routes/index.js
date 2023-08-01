// ** Routes Imports
import AuthRoutes from "./auth";
import MiscRoutes from "./misc";
import StudentRoutes from "./student";
import ProspectiveStudentRoutes from "./prospectiveStudent";
import CampusCoordinatorRoutes from "./campusCoordinator";
import FinanceAdminRoutes from "./financeAdmin";
import ictAdminRoutes from "./ictAdmin";

// ** Document title
const BrowserTabTitle = "%s - RHEMA Bible Training Center, Nigeria";

// ** Default Route
const DefaultRoute = "/";

// ** Merge Routes
const Routes = [
  ...AuthRoutes,
  ...MiscRoutes,
  ...StudentRoutes,
  ...ProspectiveStudentRoutes,
  ...CampusCoordinatorRoutes,
  ...FinanceAdminRoutes,
  ...ictAdminRoutes,
];

export { DefaultRoute, BrowserTabTitle, Routes };
