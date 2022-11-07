// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from "@iconify/react";

export default [
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Icon icon="ep:menu" />,
    navLink: "/ict-admin/dashboards",
    action: "manage",
    resource: "all",
  },
  {
    id: "userManagement",
    title: "User Management",
    icon: <Icon icon="teenyicons:users-solid" />,
    navLink: "/ict-admin/user-management",
    action: "manage",
    resource: "all",
  },
  {
    id: "roles-privilleges",
    title: "Roles & Privilleges",
    icon: <Icon icon="wpf:security-checked" />,
    navLink: "/ict-admin/roles-privilleges",
    action: "manage",
    resource: "all",
  },
  {
    id: "instructors",
    title: "instructors",
    icon: <Icon icon="fa-solid:chalkboard-teacher" />,
    navLink: "/ict-admin/instructors",
    action: "manage",
    resource: "all",
  },
  {
    id: "tutionClearance",
    title: "Tution & Clearance",
    icon: <Icon icon="fa-regular:credit-card" />,
    navLink: "/ict-admin/tution-clearance",
    action: "manage",
    resource: "all",
  },

  {
    id: "courses",
    title: "Courses",
    icon: <Icon icon="bi:collection-fill" />,
    navLink: "/ict-admin/courses",
    action: "manage",
    resource: "all",
  },
  {
    id: "messageBoard",
    title: "Message Board",
    icon: <Icon icon="fluent:mail-24-filled" />,
    navLink: "/ict-admin/message-board",
    action: "manage",
    resource: "all",
  },
  {
    id: "resources",
    title: "Resources",
    icon: <Icon icon="fa-solid:copy" />,
    navLink: "/ict-admin/resources",
    action: "manage",
    resource: "all",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Icon icon="heroicons-solid:chat-alt-2" />,
    navLink: "/ict-admin/chat",
  },
  {
    id: "events",
    title: "Events",
    icon: <Icon icon="bi:calendar2-event-fill" />,
    navLink: "/ict-admin/events",
    action: "manage",
    resource: "all",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/ict-admin/profile",
    action: "manage",
    resource: "all",
  },
  {
    id: "helpDesk",
    title: "Help Desk",
    icon: <Icon icon="ri:customer-service-2-line" />,
    navLink: "/ict-admin/help-desk",
    action: "manage",
    resource: "all",
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
];
