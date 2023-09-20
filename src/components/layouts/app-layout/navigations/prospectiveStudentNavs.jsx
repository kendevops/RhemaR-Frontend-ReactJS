import { Icon } from "@iconify/react";
import useCurrentUser from "../../../../hooks/queries/users/useCurrentUser";

// const { data, isLoading } = useCurrentUser();

const user = localStorage.getItem("userData");

const parsedData = JSON.parse(user);

console.log(parsedData);

const ProspectiveStudentNavs = [
  {
    id: "dashboard",
    title: `${
      parsedData?.levelOneApplications[0] ? "Dashboard" : "Application"
    }`,
    icon: <Icon icon="ep:menu" />,
    navLink: `${
      parsedData?.levelOneApplications[0] ? "/dashboard" : "/application"
    }`,
    action: "read",
    resource: "Applications",
  },
  {
    id: "myProfile",
    title: "My Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/profile",
    action: "read",
    resource: "Applications",
  },
];

export default ProspectiveStudentNavs;
