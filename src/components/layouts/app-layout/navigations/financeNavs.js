// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from "@iconify/react";

export default [
  {
    header: "Finance",
  },
  {
    id: "dashboards",
    title: "Dashboard",
    icon: <Icon icon="ep:menu" />,
    navLink: "/finance/dashboards",
  },
  {
    id: "tutionClearnce",
    title: "Tuition & Clearance",
    icon: <Icon icon="fa-regular:credit-card" />,
    navLink: "/finance/tution-clearance",
  },
  {
    id: "reports",
    title: "Reports",
    icon: <Icon icon="tabler:report-analytics" />,
    navLink: "/finance/reports",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Icon icon="heroicons-solid:chat-alt-2" />,
    navLink: "/finance/chat",
  },
  {
    id: "events",
    title: "Events",
    icon: <Icon icon="bi:calendar2-event-fill" />,
    navLink: "/finance/events",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/finance/profile",
  },
  {
    id: "helpDesk",
    title: "Help Desk",
    icon: <Icon icon="ri:customer-service-2-line" />,
    navLink: "/finance/helpdesk",
  },

  //{
  //id: "dashboards",
  //title: "Dashboards",
  //icon: <Icon icon="ep:menu" />,
  //badge: "light-warning",
  //badgeText: "2",
  //children: [
  //{
  //id: "analyticsDash",
  //title: "Analytics",
  //icon: <Circle size={12} />,
  //navLink: "/student/courses",
  //},
  //{
  //id: "eCommerceDash",
  //title: "eCommerce",
  //icon: <Circle size={12} />,
  //navLink: "/student/courses",
  //},
  //],
  //},
  {
    header: "Partners",
  },
];
