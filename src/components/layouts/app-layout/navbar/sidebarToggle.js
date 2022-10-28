// ** React Imports
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

// ** Icons Imports
import { Disc, X, Circle } from "react-feather";
import { Icon } from '@iconify/react';

// ** Config
import themeConfig from "@configs/themeConfig";

const SidebarToggle = (props) => {
  // ** Props
  const {
    menuCollapsed,
    menuVisibility,
    setMenuCollapsed,
    setMenuVisibility,
    setGroupOpen,
    menuHover,
  } = props;

  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([]);
  }, [menuHover, menuCollapsed]);

  // ** Function to handle Mouse Enter
  const ToggleVisibility = () => {
    setMenuVisibility((menuVisibility) => !menuVisibility);
  };

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Icon
          icon="heroicons-solid:menu-alt-1"
          width="40" height="40"
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(true)}
        />
        // <Disc
        //   size={40}
        //   data-tour="toggle-icon"
        //   className="text-primary toggle-icon d-none d-xl-block"
        //   onClick={() => setMenuCollapsed(true)}
        // />
      );
    } else {
      return (
        <Icon
          icon="heroicons-solid:menu"
          width="40" height="40"
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => setMenuCollapsed(false)}
        />
        // <Circle
        //   size={20}
        //   data-tour="toggle-icon"
        //   className="text-primary toggle-icon d-none d-xl-block"
        //   onClick={() => setMenuCollapsed(false)}
        // />
      );
    }
  };

  return (
    <>
      <div className="nav-toggle cursor-pointer">
        <Toggler />
        <X
          onClick={() => ToggleVisibility()}
          className="toggle-icon icon-x d-block d-xl-none"
          size={20}
        />
      </div>
    </>
  );
};

export default SidebarToggle;
