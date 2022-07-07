// ** React Imports
import { useEffect } from "react";
import { Fragment, useState, useRef } from "react";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Components
import MenuItems from "./menuItems";

// ** Third Party Components
import { AlertCircle, Disc, X, Circle } from "react-feather";

const Sidebar = (props) => {
  // ** Props
  const {
    menuCollapsed,
    routerProps,
    menu,
    currentActiveItem,
    skin,
    menuData,
  } = props;

  // ** States
  const [groupOpen, setGroupOpen] = useState([]);
  const [groupActive, setGroupActive] = useState([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false);

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true);
  };

  return (
    <Fragment>
      <div className="app-sidebar">

        <section
          className={classnames(
            "sidebar main-menu menu-fixed menu-accordion menu-shadow",
            {
              expanded: menuHover || menuCollapsed === false,
              "menu-light": skin !== "semi-dark" && skin !== "dark",
              "menu-dark": skin === "semi-dark" || skin === "dark",
            }
          )}
          onMouseEnter={onMouseEnter}
          onMouseLeave={() => setMenuHover(false)}
        >
          {menu ? (
            menu
          ) : (
            <Fragment>
              {/* Perfect Scrollbar */}
              <PerfectScrollbar
                className="main-menu-content"
                options={{ wheelPropagation: false }}
              >
                <ul className="navigation navigation-main">
                  <MenuItems
                    items={menuData}
                    menuData={menuData}
                    menuHover={menuHover}
                    groupOpen={groupOpen}
                    activeItem={activeItem}
                    groupActive={groupActive}
                    currentActiveGroup={currentActiveGroup}
                    routerProps={routerProps}
                    setGroupOpen={setGroupOpen}
                    menuCollapsed={menuCollapsed}
                    setActiveItem={setActiveItem}
                    setGroupActive={setGroupActive}
                    setCurrentActiveGroup={setCurrentActiveGroup}
                    currentActiveItem={currentActiveItem}
                  />
                </ul>
              </PerfectScrollbar>
            </Fragment>
          )}
        </section>
      </div>
    </Fragment>
  );
};

export default Sidebar;
