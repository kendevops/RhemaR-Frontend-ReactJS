// ** Routes Imports
import AuthRoutes from "./auth";
import MiscRoutes from "./misc";
import StudentRoutes from "./student";
import ProspectiveStudentRoutes from "./prospectiveStudent";
import StudentServiceAdminRoutes from "./studentServiceAdmin";
import FinanceAdminRoutes from "./financeAdmin";
import ictAdminRoutes from "./ictAdmin";
import instructorAdminRoutes from "./instructorAdmin";

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
  ...StudentServiceAdminRoutes,
  ...FinanceAdminRoutes,
  ...ictAdminRoutes,
  ...instructorAdminRoutes,
];

export { DefaultRoute, BrowserTabTitle, Routes };
