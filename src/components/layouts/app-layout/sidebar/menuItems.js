// ** Menu Components
import MenuLink from './menuLink'
import MenuGroup from './menuGroup'
import MenuHeader from './menuHeader'

// ** Utils
import {
  CanViewMenuItem,
  CanViewMenuGroup,
  resolveMenuItemComponent as resolveNavItemComponent
} from  '@utils/utilsLayout'

const MenuItems = props => {
  // ** Components Object
  const Components = {
    MenuLink,
    MenuGroup,
    MenuHeader
  }

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    return <TagName key={item.id || item.header} item={item} {...props} />
    if (item.children) {
      return CanViewMenuGroup(item) && <TagName item={item} index={index} key={item.id} {...props} />
    }
    return CanViewMenuItem(item) && <TagName key={item.id || item.header} item={item} {...props} />
  })

  return RenderNavItems
}

export default MenuItems
