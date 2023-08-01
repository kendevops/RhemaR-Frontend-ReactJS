// ** Core AppLayout Wrapper Import
import Layout from './guestLayoutWrapper'

// ** Menu Items Array
import navigation from './navigations/guestNavs'

const AppLayout = props => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  return (
    <Layout menuData={navigation} {...props}>
      {props.children}
    </Layout>
  )
}

export default AppLayout
