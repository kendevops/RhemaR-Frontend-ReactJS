// ** Store Imports
import { handleFooterType } from '@store/slices/layoutSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useFooterType = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.layout)

  const setFooterType = type => {
    dispatch(handleFooterType(type))
  }

  return { setFooterType, footerType: store.footerType }
}
