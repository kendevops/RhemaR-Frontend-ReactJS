// ** Navigation imports
import studentNavs from './studentNavs'
import alumniNavs from './alumniNavs'
import financeNavs from './financeNavs'
import ictAdminNavs from './ictAdminNavs'
import instructorNavs from './instructorNavs'
import alumniAdminNavs from './alumniAdminNavs'
import nationalDirectorNavs from './nationalDirectorNavs'
import campusCoordinatorNavs from './campusCoordinatorNavs'

// ** Merge & Export
export default [...studentNavs, ...campusCoordinatorNavs, ...alumniNavs]
