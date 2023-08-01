// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from "@iconify/react";

export default [
  {
    header: "TCAdmin",
  },
  {
    id: "dashboards",
    title: "Dashboard",
    icon: <Icon icon="ep:menu" />,
    navLink: "/tc-admin/dashboards",
  },
  {
    id: "students",
    title: "Students",
    icon: <Icon icon="teenyicons:users-solid" />,
    navLink: "/tc-admin/students",
  },
  {
    id: "instructors",
    title: "Instructors",
    icon: <Icon icon="fa-solid:chalkboard-teacher" />,
    navLink: "/tc-admin/instructors",
  },
  {
    id: "alumni",
    title: "Alumni",
    icon: <Icon icon="tabler:report-analytics" />,
    navLink: "/tc-admin/alumni",
  },
  {
    id: "courses",
    title: "Courses",
    icon: <Icon icon="bi:collection-fill" />,
    navLink: "/tc-admin/courses",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Icon icon="heroicons-solid:chat-alt-2" />,
    navLink: "/tc-admin/chat",
  },
  {
    id: "resources",
    title: "Resources",
    icon: <Icon icon="icomoon-free:profile" />,
    navLink: "/tc-admin/resources",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Icon icon="icomoon-free:profile" />,
    navLink: "/tc-admin/chat",
  },
  {
    id: "report",
    title: "Report",
    icon: <Icon icon="tabler:report-analytics" />,
    navLink: "/tc-admin/report",
  },
  {
    id: "events",
    title: "Events",
    icon: <Icon icon="bi:calendar2-event-fill" />,
    navLink: "/tc-admin/events",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/tc-admin/profile",
  },
  {
    id: "helpDesk",
    title: "Help Desk",
    icon: <Icon icon="ri:customer-service-2-line" />,
    navLink: "/tc-admin/help-desk",
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
