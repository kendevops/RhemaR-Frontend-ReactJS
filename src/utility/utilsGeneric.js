// import { useContext } from "react";
// import { AbilityContext } from "@src/utility/context/can";


/**
 ** Setup user abilities based on their roles
 * @param {String} userRole Role of user
 */
 export const UpdateLoggedInUserAbility = (userRole, ability) => {
  // const ability = useContext(AbilityContext);
  if (userRole === "AllAdmin") {
    ability.update([
      {
        action: "manage",
        subject: "all",
      },
    ]);
  }
  if (userRole === "ProspectiveStudent") {
    ability.update([
      {
        action: "Access",
        subject: "AllGuestPages",
      },
      {
        action: "Verify",
        subject: "Email",
      },
    ]);
  }
  if (userRole === "Level1Student") {
    ability.update([
      {
        action: "Access",
        subject: "AllGuestPages",
      },
      {
        action: "Access",
        subject: "Level1CoursePages",
      },
      {
        action: "read",
        subject: "Auth",
      },
    ]);
  }
  if (userRole === "Level2Student") {
    ability.update([
      {
        action: "Access",
        subject: "AllGuestPages",
      },
      {
        action: "Access",
        subject: "Level2CoursePages",
      },
      {
        action: "read",
        subject: "Auth",
      },
    ]);
  }
};

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = (obj) => Object.keys(obj).length === 0;

// ** Returns K format from a number
export const kFormatter = (num) =>
  num > 999 ? `${(num / 1000).toFixed(1)}k` : num;

// ** Converts HTML to string
export const htmlToString = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

// ** Checks if the passed date is today
const isToday = (date) => {
  const today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  );
};

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (
  value,
  formatting = { month: "short", day: "numeric", year: "numeric" }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value);
  let formatting = { month: "short", day: "numeric" };

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: "numeric", minute: "numeric" };
  }

  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem("userData");
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

/**
 ** Navigate users to different dashboard based on their roles
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = (userRole) => {
  if (userRole === "AllAdmin") return "/dashboard";
  if (userRole === "client") return "/access-control";
  return "/login";
};

// ** React Select Theme Colors
export const selectThemeColors = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: "#7367f01a", // for option hover bg-color
    primary: "#7367f0", // for selected option bg-color
    neutral10: "#7367f0", // for tags bg-color
    neutral20: "#ededed", // for input border-color
    neutral30: "#ededed", // for input hover border-color
  },
});
