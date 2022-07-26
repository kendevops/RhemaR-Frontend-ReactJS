// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from '@iconify/react';


export default [
  {
    header: "ICTAdmin",
  },
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Icon icon="ep:menu" />,
    navLink: "/ict-admin/dashboards",
  },
  {
    id: "userManagement",
    title: "User Management",
    icon: <Icon icon="teenyicons:users-solid" />,
    navLink: "/ict-admin/user-management",
  },
  {
    id: "roles-privilleges",
    title: "Roles & Privilleges",
    icon: <Icon icon="wpf:security-checked" />,
    navLink: "/ict-admin/roles-privilleges",
  },
  {
    id: "instructors",
    title: "instructors",
    icon: <Icon icon="fa-solid:chalkboard-teacher" />,
    navLink: "/ict-admin/instructors",
  },
  {
    id: "tutionClearance",
    title: "Tution & Clearance",
    icon: <Icon icon="fa-regular:credit-card" />,
    navLink: "/ict-admin/tution-clearance",
  },
  {
    id: "courses",
    title: "Courses",
    icon: <Icon icon="bi:collection-fill" />,
    navLink: "/ict-admin/courses",
  },
  {
    id: "messageBoard",
    title: "Message Board",
    icon: <Icon icon="fluent:mail-24-filled" />,
    navLink: "/ict-admin/message-board",
  },
  {
    id: "resources",
    title: "Resources",
    icon: <Icon icon="fa-solid:copy" />,
    navLink: "/ict-admin/resources",
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
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/ict-admin/profile",
  },
  {
    id: "helpDesk",
    title: "Help Desk",
    icon: <Icon icon="ri:customer-service-2-line" />,
    navLink: "/ict-admin/help-desk",
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
