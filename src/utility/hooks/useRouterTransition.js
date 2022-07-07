// ** Store Imports
import { handleRouterTransition } from '@store/slices/layoutSlice'
import { useDispatch, useSelector } from 'react-redux'

export const useRouterTransition = () => {
  // ** Hooks
  const dispatch = useDispatch()
  const store = useSelector(state => state.layout)

  const setTransition = type => {
    dispatch(handleRouterTransition(type))
  }

  return { transition: store.routerTransition, setTransition }
}
