import { Icon } from "@iconify/react";
import useCurrentUser from "../../../../hooks/queries/users/useCurrentUser";

// const { data, isLoading } = useCurrentUser();

const user = localStorage.getItem("userData");

console.log(user);

const ProspectiveStudentNavs = [
  {
    id: "dashboard",
    title: `${user?.level ? "Dashboard" : "Application"}`,
    icon: <Icon icon="ep:menu" />,
    navLink: `${user?.level ? "/dashboard" : "/application"}`,
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
