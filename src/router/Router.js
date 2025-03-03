// ** React Imports
import { Suspense, useContext, lazy, Fragment, useEffect } from "react";

// ** Utils
import { isUserLoggedIn } from "@utils/utilsGeneric.js";
import { useLayout } from "@hooks/useLayout";
import { AbilityContext } from "@context/can";
import { useRouterTransition } from "@hooks/useRouterTransition";

// ** Custom Components
import ContentWrapper from "@layouts/contentWrapper";

// ** Router Components
import {
  BrowserRouter as AppRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";

// ** Routes & Default Routes
import { DefaultRoute, Routes } from "./routes";

// ** Layouts
import AppLayout from "@layouts/app-layout/appLayout";
import GuestLayout from "@layouts/guest-layout/guestLayout";
import BlankLayout from "@layouts/blank-layout/blankLayout";

import {
  getHomeRouteForLoggedInUser,
  getUserData,
  UpdateLoggedInUserAbility,
} from "../utility/utilsGeneric";
import userRoles from "../utility/userRoles";
import useCurrentUser from "../hooks/queries/users/useCurrentUser";
import getToken from "../utils/getToken";
import parseJwt from "../utils/parseJwt";
import { handleLogout } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Router = () => {
  // ** ACL Ability Context
  const ability = useContext(AbilityContext);

  // ** Updating Ability on Load
  const { data: userData } = useCurrentUser();
  const loggedIn = isUserLoggedIn();
  const data = getUserData();

  const accessToken = getToken("accessToken");
  const decodedJwt = parseJwt(accessToken);

  const dispatch = useDispatch();
  const history = useHistory();

  // logout after access expired
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (decodedJwt?.exp * 1000 < Date.now()) {
      dispatch(handleLogout(getUserData()));
      window.location.href("/login");
    }
  }, [decodedJwt?.exp, dispatch, history]);

  useEffect(() => {
    if (loggedIn) {
      const userRole =
        Array.isArray(data?.roles) && data?.roles?.length
          ? data?.roles[0]?.name
          : userRoles.PROSPECTIVE_STUDENT;

      UpdateLoggedInUserAbility(userRole, ability);

      // Giving permissions for multiple roles
      // data?.roles?.length &&
      //   data?.roles?.forEach((role) =>
      //     UpdateLoggedInUserAbility(role?.name, ability)
      //   );
    }
  }, [loggedIn, ability, data, userData]);

  // ** Hooks
  const { layout, setLayout, setLastLayout } = useLayout();
  const { transition, setTransition } = useRouterTransition();

  // ** Default Layout
  const DefaultLayout = layout === "app" ? "AppLayout" : "GuestLayout";

  // ** All of the available layouts
  const Layouts = { BlankLayout, AppLayout, GuestLayout };

  // ** Current Active Item
  const currentActiveItem = null;

  // ** Return Filtered Array of Routes & Paths
  const LayoutRoutesAndPaths = (layout) => {
    const LayoutRoutes = [];
    const LayoutPaths = [];

    if (Routes) {
      Routes.filter((route) => {
        // ** Checks if Route layout or Default layout matches current layout
        if (
          route.layout === layout ||
          (route.layout === undefined && DefaultLayout === layout)
        ) {
          LayoutRoutes.push(route);
          LayoutPaths.push(route.path);
        }
      });
    }

    return { LayoutRoutes, LayoutPaths };
  };

  // ** Init Error & NotAuthorized Components
  const Error = lazy(() => import("@views/misc/error"));
  const NotAuthorized = lazy(() => import("@views/misc/notAuthorized"));

  /**
   ** Final Route Component Checks for Login & User Role and then redirects to the route
   */
  const FinalRoute = (props) => {
    const route = props.route;
    let action, resource;

    // // delete in production
    // return <route.component {...props} />;

    // ** Assign vars based on route meta
    if (route.meta) {
      action = route.meta.action ? route.meta.action : null;
      resource = route.meta.resource ? route.meta.resource : null;

      console.log({
        action,
        resource,
      });
    }

    if (
      (!isUserLoggedIn() && route.meta === undefined) ||
      (!isUserLoggedIn() &&
        route.meta &&
        !route.meta.authRoute &&
        !route.meta.publicRoute)
    ) {
      /**
       ** If user is not Logged in & route meta is undefined
       ** OR
       ** If user is not Logged in & route.meta.authRoute, !route.meta.publicRoute are undefined
       ** Then redirect user to login
       */

      return <Redirect to="/login" />;
    } else if (route.meta && route.meta.authRoute && isUserLoggedIn()) {
      // ** If route has meta and authRole and user is Logged in then redirect user to home page (DefaultRoute)
      return <Redirect to="/login" />;
    } else if (isUserLoggedIn() && !ability.can(action || "read", resource)) {
      console.log("Route access", action, resource, isUserLoggedIn());

      // ** If user is Logged in and doesn't have ability to visit the page redirect the user to Not Authorized
      return <Redirect to="/misc/not-authorized" />;
    } else {
      // ** If none of the above render component
      return <route.component {...props} />;
    }
  };

  // ** Return Route to Render
  const ResolveRoutes = () => {
    return Object.keys(Layouts).map((layout, index) => {
      // ** Convert Layout parameter to Layout Component
      // ? Note: make sure to keep layout and component name equal

      const LayoutTag = Layouts[layout]; // BlankLayout, AppLayout, GuestLayout

      // ** Get Routes and Paths of the Layout
      const { LayoutRoutes, LayoutPaths } = LayoutRoutesAndPaths(layout);

      // ** We have freedom to display different layout for different route
      // ** We have made LayoutTag dynamic based on layout, we can also replace it with the only layout component,
      // ** that we want to implement like AppLayout or GuestLayout
      // ** We segregated all the routes based on the layouts and Resolved all those routes inside layouts

      // ** RouterProps to pass them to Layouts
      const routerProps = {};

      return (
        <Route path={LayoutPaths} key={index}>
          <LayoutTag // BlankLayout, AppLayout, GuestLayout
            layout={layout}
            setLayout={setLayout}
            transition={transition}
            routerProps={routerProps}
            setLastLayout={setLastLayout}
            setTransition={setTransition}
            currentActiveItem={currentActiveItem}
          >
            <Switch>
              {LayoutRoutes.map((route) => {
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact === true}
                    render={(props) => {
                      // ** Assign props to routerProps
                      Object.assign(routerProps, {
                        ...props,
                        meta: route.meta,
                      });

                      return (
                        <Fragment>
                          {/* Layout Wrapper to add classes based on route's layout, appLayout and className */}

                          {route.layout === "BlankLayout" ? (
                            <Fragment>
                              <FinalRoute route={route} {...props} />
                            </Fragment>
                          ) : (
                            <ContentWrapper
                              layout={DefaultLayout}
                              transition={transition}
                              setTransition={setTransition}
                              /* Conditional props */
                              /*eslint-disable */
                              {...(route.appLayout
                                ? {
                                    appLayout: route.appLayout,
                                  }
                                : {})}
                              {...(route.meta
                                ? {
                                    routeMeta: route.meta,
                                  }
                                : {})}
                              {...(route.className
                                ? {
                                    wrapperClass: route.className,
                                  }
                                : {})}
                              /*eslint-enable */
                            >
                              <Suspense fallback={null}>
                                <FinalRoute route={route} {...props} />
                              </Suspense>
                            </ContentWrapper>
                          )}
                        </Fragment>
                      );
                    }}
                  />
                );
              })}
            </Switch>
          </LayoutTag>
        </Route>
      );
    });
  };

  return (
    <>
      <AppRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          {/* If user is logged in Redirect user to DefaultRoute else to login */}
          <Route
            exact
            path="/"
            render={() => {
              return isUserLoggedIn() ? (
                <Redirect
                  to={getHomeRouteForLoggedInUser(
                    Array.isArray(data?.roles) && data?.roles?.length
                      ? data?.roles[0]?.name
                      : userRoles.PROSPECTIVE_STUDENT
                  )}
                />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          {/* Not Auth Route */}
          <Route
            exact
            path="/misc/not-authorized"
            render={() => (
              <Layouts.BlankLayout>
                <NotAuthorized />
              </Layouts.BlankLayout>
            )}
          />
          {ResolveRoutes()}

          {/* NotFound Error page */}
          <Route path="*" component={Error} />
        </Switch>
      </AppRouter>
    </>
  );
};

export default Router;
