// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from "@iconify/react";

export default [
  {
    id: "dashboards",
    title: "Dashboard",
    icon: <Icon icon="ep:menu" />,
    navLink: "/ict-admin/dashboard",
    action: "read",
    resource: "Admins",
  },
  {
    id: "userManagement",
    title: "User Management",
    icon: <Icon icon="teenyicons:users-solid" />,
    navLink: "/ict-admin/user-management",
    action: "read",
    resource: "Admins",
  },
  {
    id: "applications",
    title: "Applications",
    icon: <Icon icon="teenyicons:users-solid" />,
    navLink: "/ict-admin/applications",
    action: "read",
    resource: "Admins",
  },
  {
    id: "roles-privilleges",
    title: "Roles & Privilleges",
    icon: <Icon icon="wpf:security-checked" />,
    navLink: "/ict-admin/roles-privilleges",
    action: "read",
    resource: "Admins",
  },
  {
    id: "instructors",
    title: "Instructors",
    icon: <Icon icon="fa-solid:chalkboard-teacher" />,
    navLink: "/ict-admin/instructors",
    action: "read",
    resource: "Admins",
  },
  {
    id: "tutionClearance",
    title: "Tution & Clearance",
    icon: <Icon icon="fa-regular:credit-card" />,
    navLink: "/ict-admin/tuition-clearance",
    action: "read",
    resource: "Admins",
  },

  {
    id: "campuses",
    title: "Campuses",
    icon: <Icon icon="mingcute:school-fill" />,
    navLink: "/ict-admin/campuses",
    action: "read",
    resource: "Admins",
  },
  {
    id: "courses",
    title: "Courses",
    icon: <Icon icon="bi:collection-fill" />,
    navLink: "/ict-admin/courses",
    action: "read",
    resource: "Admins",
  },
  {
    id: "timetable",
    title: "Timetable",
    icon: <Icon icon="material-symbols:calendar-month-rounded" />,
    navLink: "/ict-admin/timetable",
    action: "read",
    resource: "Admins",
  },
  {
    id: "exams",
    title: "Exams",
    icon: <Icon icon="mdi:note-text" />,
    navLink: "/ict-admin/exams",
    action: "read",
    resource: "Admins",
  },
  {
    id: "messageBoard",
    title: "Message Board",
    icon: <Icon icon="fluent:mail-24-filled" />,
    navLink: "/ict-admin/message-board",
    action: "read",
    resource: "Admins",
  },
  {
    id: "resources",
    title: "Resources",
    icon: <Icon icon="fa-solid:copy" />,
    navLink: "/ict-admin/resources",
    action: "read",
    resource: "Admins",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Icon icon="heroicons-solid:chat-alt-2" />,
    navLink: "/ict-admin/chat",
    action: "read",
    resource: "Admins",
  },
  {
    id: "events",
    title: "Events",
    icon: <Icon icon="bi:calendar2-event-fill" />,
    navLink: "/ict-admin/events",
    action: "read",
    resource: "Admins",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/ict-admin/profile",
    action: "read",
    resource: "Admins",
  },
  {
    id: "helpDesk",
    title: "Help Desk",
    icon: <Icon icon="ri:customer-service-2-line" />,
    navLink: "/ict-admin/help-desk",
    action: "read",
    resource: "Admins",
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
