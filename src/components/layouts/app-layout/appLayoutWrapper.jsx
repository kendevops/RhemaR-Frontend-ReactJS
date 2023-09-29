// ** React Imports
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux";
import {
  handleMenuCollapsed,
  handleContentWidth,
  handleMenuHidden,
} from "@store/slices/layoutSlice";

// ** Third Party Components
import classnames from "classnames";
import { ArrowUp } from "react-feather";

// ** Reactstrap Imports
import { Navbar, Button } from "reactstrap";

// ** Configs
import themeConfig from "@configs/themeConfig";

// ** Custom Components
import ScrollToTop from "@components/scrolltop";
import NavbarComponent from "./navbar/appNavbar";
import SidebarComponent from "./sidebar/appSidebar";

// ** Custom Hooks
import { useRTL } from "@hooks/useRTL";
import { useSkin } from "@hooks/useSkin";
import { useNavbarType } from "@hooks/useNavbarType";
import { useFooterType } from "@hooks/useFooterType";

const AppLayoutWrapper = (props) => {
  // ** Props
  const {
    menu,
    navbar,
    menuData,
    children,
    routerProps,
    setLastLayout,
    currentActiveItem,
  } = props;

  // ** Hooks
  const [isRtl, setIsRtl] = useRTL();
  const { skin, setSkin } = useSkin();
  const { navbarType, setNavbarType } = useNavbarType();
  const { footerType, setFooterType } = useFooterType();

  // ** States
  const [isMounted, setIsMounted] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // ** Store Vars
  const dispatch = useDispatch();
  const layoutStore = useSelector((state) => state.layout);

  // ** Update Window Width
  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // ** Vars
  const location = useLocation();
  const contentWidth = layoutStore.contentWidth;
  const menuCollapsed = layoutStore.menuCollapsed;
  const isHidden = layoutStore.menuHidden;

  // ** Toggles Menu Collapsed
  const setMenuCollapsed = (val) => dispatch(handleMenuCollapsed(val));

  // ** Handles Content Width
  const setContentWidth = (val) => dispatch(handleContentWidth(val));

  // ** Handles Content Width
  const setIsHidden = (val) => dispatch(handleMenuHidden(val));

  //** This function will detect the Route Change and will hide the menu on menu item click
  useEffect(() => {
    if (menuVisibility && windowWidth < 1200) {
      setMenuVisibility(false);
    }
  }, [location]);

  //** Sets Window Size & Layout Props
  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", handleWindowWidth);
    }
  }, [windowWidth]);

  //** ComponentDidMount
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // ** Vars
  const footerClasses = {
    static: "footer-static",
    sticky: "footer-fixed",
    hidden: "footer-hidden",
  };

  const navbarClasses = {
    floating: "navbar-floating",
    sticky: "navbar-sticky",
    static: "navbar-static",
    hidden: "navbar-hidden",
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div
      className={classnames(
        `app-layout-wrapper wrapper vertical-layout ${
          navbarClasses[navbarType] || "navbar-floating"
        } ${footerClasses[footerType] || "footer-static"}`,
        {
          // Modern Menu
          "vertical-menu-modern": windowWidth >= 1200,
          "menu-collapsed": menuCollapsed && windowWidth >= 1200,
          "menu-expanded": !menuCollapsed && windowWidth > 1200,

          // Overlay Menu
          "vertical-overlay-menu": windowWidth < 1200,
          "menu-hide": !menuVisibility && windowWidth < 1200,
          "menu-open": menuVisibility && windowWidth < 1200,
        }
      )}
      {...(isHidden ? { "data-col": "1-column" } : {})}
    >
      {!isHidden ? (
        <SidebarComponent
          skin={skin}
          menu={menu}
          menuData={menuData}
          routerProps={routerProps}
          windowWidth={windowWidth}
          menuCollapsed={menuCollapsed}
          menuVisibility={menuVisibility}
          setMenuCollapsed={setMenuCollapsed}
          setMenuVisibility={setMenuVisibility}
          currentActiveItem={currentActiveItem}
        />
      ) : null}

      {navbar ? (
        navbar
      ) : (
        <NavbarComponent
          menuCollapsed={menuCollapsed}
          setMenuCollapsed={setMenuCollapsed}
          setMenuVisibility={setMenuVisibility}
          skin={skin}
          setSkin={setSkin}
        />
      )}

      {/* Main Content */}
      <div className="app-content-wrapper">{children}</div>

      {/* Menu Overlay */}
      <div
        className={classnames("sidenav-overlay", {
          show: menuVisibility,
        })}
        onClick={() => setMenuVisibility(false)}
      ></div>
      {/* Menu Overlay */}

      {themeConfig.layout.scrollTop === true ? (
        <div className="scroll-to-top">
          <ScrollToTop showOffset={300} className="scroll-top d-block">
            <Button className="btn-icon" color="primary">
              <ArrowUp size={14} />
            </Button>
          </ScrollToTop>
        </div>
      ) : null}
    </div>
  );
};

export default AppLayoutWrapper;
