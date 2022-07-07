// ** Third Party Components
import { MoreHorizontal } from 'react-feather'

const MenuSectionHeader = ({ item }) => {
  return (
    <li className='navigation-header'>
      <span>{item.header}</span>
      <MoreHorizontal className='feather-more-horizontal' />
    </li>
  )
}

export default MenuSectionHeader
