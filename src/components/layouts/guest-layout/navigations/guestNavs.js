// ** Icons Import
import { Home, Circle, Mail, MessageSquare } from "react-feather";

export default [
  {
    header: "Apps & Pages",
  },
  {
    id: "email",
    title: "Email",
    icon: <Mail size={20} />,
    navLink: "/apps/email",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <MessageSquare size={20} />,
    navLink: "/apps/chat",
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
        navLink: "/dashboard/analytics",
      },
      {
        id: "eCommerceDash",
        title: "eCommerce",
        icon: <Circle size={12} />,
        navLink: "/dashboard/ecommerce",
      },
    ],
  },
];
