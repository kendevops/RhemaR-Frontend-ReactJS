// ** Navigation imports
import AlumniNavs from './alumniNavs'
import PartnerNavs from './partnerNavs'
import TcAdminNavs from './tcAdminNavs'
import StudentNavs from './studentNavs'
import FinanceNavs from './financeNavs'
import IctAdminNavs from './ictAdminNavs'
import InstructorNavs from './instructorNavs'
import AlumniAdminNavs from './alumniAdminNavs'
import PartnerAdminNavs from './partnerAdminNavs'
import NationalDirectorNavs from './nationalDirectorNavs'
import CampusCoordinatorNavs from './campusCoordinatorNavs'

// ** Merge & Export
export default [...StudentNavs, ...CampusCoordinatorNavs, ...AlumniAdminNavs, ...AlumniNavs, ...FinanceNavs, ...IctAdminNavs, ...InstructorNavs, ...NationalDirectorNavs, ...PartnerAdminNavs, ...PartnerNavs, ...TcAdminNavs]
