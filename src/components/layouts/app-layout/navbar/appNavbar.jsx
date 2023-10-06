// ** React Imports
import { Fragment, useState, useRef, useEffect, useContext } from "react";

// ** Config
import themeConfig from "@configs/themeConfig";

// ** Components
import SidebarToggle from "./sidebarToggle";
import {
  UpdateLoggedInUserAbility,
  getHomeRouteForLoggedInUser,
  getRoleForRoute,
  getUserData,
} from "../../../../utility/utilsGeneric";
import UserAvatar from "../../../atoms/UserAvatar";
import useToggle from "../../../../utility/hooks/useToggle";
import { handleLogout } from "../../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import useCurrentUser from "../../../../hooks/queries/users/useCurrentUser";
import useSubscribeNotifications from "../../../../hooks/queries/notifications/useSubscribeNotifications";
import { AbilityContext } from "../../../../utility/context/can";
import RoleContext from "../../../../utility/context/roleContext";
import AccessContext from "../../../../utility/context/accessContext";

const Navbar = (props) => {
  // ** States
  const [groupOpen, setGroupOpen] = useState([]);
  const ability = useContext(AbilityContext);

  const { currentRole, setCurrentRole } = useContext(RoleContext);

  // ** Avatar Dropdown

  const [avatarOpen, toggleAvatarOpen] = useToggle();

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false);

  const { data } = useCurrentUser();

  const access = useContext(AccessContext);

  const currentUser = getUserData();
  const dispatch = useDispatch();
  const history = useHistory();
  // const { data: newNotification } = useSubscribeNotifications();

  const checkRoleMatch = (role) => {
    const roleForRoute = getRoleForRoute(history.location.pathname);

    return roleForRoute === role;
  };

  // useEffect(() => {
  //   if (newNotification) {
  //     console.log({ newNotification });
  //   }
  // }, [newNotification]);

  const logOut = () => {
    dispatch(handleLogout(currentUser));
    history.replace("/login");
  };

  function handleRoleSwitch(role) {
    setCurrentRole(role);
    console.log(role);
    UpdateLoggedInUserAbility(role, ability, access);
    history.push(getHomeRouteForLoggedInUser(role));
  }

  const rolesOptions =
    currentUser?.roles
      ?.filter((role) => role?.name !== "PROSPECTIVE_STUDENT")
      .map((role) => {
        const r = role?.name;
        return {
          id: r,
          children: (
            <p
              className="mt-3"
              style={{
                color: checkRoleMatch(r) ? "green" : "",
              }}
            >
              {checkRoleMatch(r) ? `Signed in as ${r}` : `Switch to ${r}`}
            </p>
          ),
          onClick: () => {
            handleRoleSwitch(r);
          },
        };
      }) ?? [];

  const options = [
    {
      id: "Edit Profile",
      children: <p>Edit Profile</p>,
      onClick: () => {},
    },
    ...rolesOptions,
  ];

  return (
    <Fragment>
      <div className="app-navbar">
        <nav className="fixed-top">
          <div className="d-flex justify-content-start align-items-center">
            {/* To Toggle Menu */}
            <SidebarToggle
              setGroupOpen={setGroupOpen}
              menuHover={menuHover}
              setMenuHover={setMenuHover}
              {...props}
            />

            {/* Header Logo */}
            <img
              src={themeConfig.app.appLogoImage}
              alt="rhema_logo"
              className="logo"
            />
          </div>
          <div className="d-flex align-items-center">
            <div className="me-5 notifcation-bell">
              <a href="/{{ module }}/notifications">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 36 36"
                >
                  <path
                    className="clr-i-solid--badged clr-i-solid-path-1--badged"
                    d="M18 34.28A2.67 2.67 0 0 0 20.58 32h-5.26A2.67 2.67 0 0 0 18 34.28z"
                    fill="#203864"
                  />
                  <path
                    className="clr-i-solid--badged clr-i-solid-path-2--badged"
                    d="M32.85 28.13l-.34-.3A14.37 14.37 0 0 1 30 24.9a12.63 12.63 0 0 1-1.35-4.81v-4.94a10.92 10.92 0 0 0-.16-1.79A7.5 7.5 0 0 1 22.5 6v-.63a10.57 10.57 0 0 0-3.32-1V3.11a1.33 1.33 0 1 0-2.67 0v1.31a10.81 10.81 0 0 0-9.3 10.73v4.94a12.63 12.63 0 0 1-1.35 4.81a14.4 14.4 0 0 1-2.47 2.93l-.34.3v2.82h29.8z"
                    fill="#203864"
                  />
                  <circle
                    className="clr-i-solid--badged clr-i-solid-path-3--badged clr-i-badge"
                    cx="30"
                    cy="6"
                    r="5"
                    fill="#D93B2B"
                  />
                </svg>
              </a>
            </div>
            <h2 className="me-3">
              {data?.firstName} {data?.lastName}
            </h2>

            {/* Dropdown Toggle */}
            <div className="dropdown">
              <div className="d-flex align-items-center">
                <div
                  className="dropdown-toggle d-flex align-items-center click"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={toggleAvatarOpen}
                >
                  <UserAvatar />
                  {avatarOpen && (
                    <ul className="avatar-dropdown shadow-lg rounded-2">
                      {options?.map(({ onClick, children, id }) => {
                        return (
                          <li
                            key={id}
                            className="avatar-dropdown-item"
                            {...{ onClick }}
                          >
                            {children}
                          </li>
                        );
                      })}
                      <li
                        className="avatar-dropdown-item mt-4"
                        onClick={logOut}
                      >
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default Navbar;
