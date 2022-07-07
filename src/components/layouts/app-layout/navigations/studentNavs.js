// ** Icons Import
import { Home, Circle, Mail, MessageSquare } from "react-feather";

export default [
  {
    header: "Students",
  },
  {
    id: "email",
    title: "Email",
    icon: <Mail size={20} />,
    navLink: "/student/courses",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <MessageSquare size={20} />,
    navLink: "/student/courses",
  },
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Home size={20} />,
    badge: "light-warning",
    badgeText: "2",
    children: [
      {
        id: "analyticsDash",
        title: "Analytics",
        icon: <Circle size={12} />,
        navLink: "/student/courses",
      },
      {
        id: "eCommerceDash",
        title: "eCommerce",
        icon: <Circle size={12} />,
        navLink: "/student/courses",
      },
    ],
  },
  {
    header: "Partners",
  },
];
