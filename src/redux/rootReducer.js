import auth from './slices/authSlice'
import layout from './slices/layoutSlice'
import attendance from './slices/attendanceSlice'

const rootReducer = {
  auth,
  layout,
  attendance,
}

export default rootReducer
