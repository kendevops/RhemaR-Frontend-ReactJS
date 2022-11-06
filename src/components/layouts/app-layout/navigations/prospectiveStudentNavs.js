import { Icon } from "@iconify/react";

const ProspectiveStudentNavs = [
  {
    id: "application",
    title: "Application",
    icon: <Icon icon="ep:menu" />,
    navLink: "/application",
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
