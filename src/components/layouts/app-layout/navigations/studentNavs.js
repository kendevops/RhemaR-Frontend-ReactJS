// ** Icons Import
import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from '@iconify/react';


export default [
  {
    header: "Students",
  },
  {
    id: "email",
    title: "Dine",
    icon: <Icon icon = "fluent:mail-24-filled"/>,
    navLink: "/student/courses",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Icon icon="heroicons-solid:chat-alt-2" />,
    navLink: "/student/courses",
  },
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Icon icon="ep:menu" />,
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
