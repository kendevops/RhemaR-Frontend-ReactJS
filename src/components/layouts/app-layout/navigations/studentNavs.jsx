// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from "@iconify/react";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Icon icon="ep:menu" />,
    navLink: "/student/dashboard",
    action: "read",
    resource: "Students",
  },
  {
    id: "schedule",
    title: "Schedule",
    icon: <Icon icon="ep:menu" />,
    navLink: "/student/schedule",
    action: "read",
    resource: "Students",
  },

  {
    id: "elearning",
    title: "E-Learning",
    icon: <Icon icon="ep:menu" />,
    navLink: "/student/elearning",
    action: "read",
    resource: "Students",
  },
  {
    id: "academic-report",
    title: "Academic Report",
    icon: <Icon icon="fa-regular:credit-card" />,
    navLink: "/student/academic-report",
    action: "read",
    resource: "Students",
  },

  {
    id: "quizes",
    title: "Quizes",
    icon: <Icon icon="fa-regular:credit-card" />,
    navLink: "/student/quizes",
    action: "read",
    resource: "Students",
  },
  {
    id: "tuition",
    title: "Tuition",
    icon: <Icon icon="fa-regular:credit-card" />,
    navLink: "/student/tuition",
    action: "read",
    resource: "Students",
  },
  {
    id: "downloads",
    title: "Downloads",
    icon: <Icon icon="akar-icons:download" />,
    navLink: "/student/downloads",
    action: "read",
    resource: "Students",
  },
  {
    id: "notice",
    title: "Notices",
    icon: <Icon icon="ep:menu" />,
    navLink: "/student/notice",
    action: "read",
    resource: "Students",
  },

  {
    id: "faq",
    title: "FAQ",
    icon: <Icon icon="ep:menu" />,
    navLink: "/student/faq",
    action: "read",
    resource: "Students",
  },
  // {
  //   id: "courses",
  //   title: "Courses",
  //   icon: <Icon icon="bi:collection-fill" />,
  //   navLink: "/student/courses",
  //   action: "read",
  //   resource: "Students",
  // },
  {
    id: "pmr",
    title: "PMR",
    icon: <Icon icon="bi:collection-fill" />,
    navLink: "/student/pmr",
    action: "read",
    resource: "Students",
  },

  // {
  //   id: "tution&clearance",
  //   title: "Tuition & Clearance",
  //   icon: <Icon icon="fa-regular:credit-card" />,
  //   navLink: "/student/tuition-clearance",
  //   action: "read",
  //   resource: "Students",
  // },
  {
    id: "events",
    title: "Events",
    icon: <Icon icon="bi:calendar2-event-fill" />,
    navLink: "/student/events",
    action: "read",
    resource: "Students",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/student/profile",
    action: "read",
    resource: "Students",
  },
  {
    id: "helpdesk",
    title: "Help Desk",
    icon: <Icon icon="ri:customer-service-2-line" />,
    navLink: "/student/helpdesk",
    action: "read",
    resource: "Students",
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
