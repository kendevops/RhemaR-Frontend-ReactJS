// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from "@iconify/react";

export default [
  {
    header: "NationalDirector",
  },
  {
    id: "dashboards",
    title: "Dashboard",
    icon: <Icon icon="ep:menu" />,
    navLink: "/national-director/dashboards",
  },
  {
    id: "campusNetwork",
    title: "Campus Network",
    icon: <Icon icon="mdi:home-analytics" />,
    navLink: "/national-director/campus-network",
  },
  {
    id: "tutionClearance",
    title: "Tuition & Clearance",
    icon: <Icon icon="fa-regular:credit-card" />,
    navLink: "/national-director/tution-clearance",
  },
  {
    id: "messageBoard",
    title: "Message Board",
    icon: <Icon icon="fluent:mail-24-filled" />,
    navLink: "/national-director/message-board",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Icon icon="heroicons-solid:chat-alt-2" />,
    navLink: "/national-director/chat",
  },
  {
    id: "report",
    title: "Report",
    icon: <Icon icon="tabler:report-analytics" />,
    navLink: "/national-director/report",
  },
  {
    id: "events",
    title: "Events",
    icon: <Icon icon="bi:calendar2-event-fill" />,
    navLink: "/national-director/events",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/national-director/profile",
  },
  {
    id: "helpDesk",
    title: "Help Desk",
    icon: <Icon icon="ri:customer-service-2-line" />,
    navLink: "/national-director/help-desk",
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
