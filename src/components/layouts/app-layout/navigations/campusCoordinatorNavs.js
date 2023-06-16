// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from "@iconify/react";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Icon icon="ep:menu" />,
    navLink: "/campus-coordinator/dashboard",
  },
  {
    id: "applications",
    title: "Applications",
    icon: <Icon icon="teenyicons:users-solid" />,
    navLink: "/campus-coordinator/applications",
  },
  {
    id: "students",
    title: "Students",
    icon: <Icon icon="teenyicons:users-solid" />,
    navLink: "/campus-coordinator/students",
  },
  {
    id: "instructors",
    title: "Instructors",
    icon: <Icon icon="fa-solid:chalkboard-teacher" />,
    navLink: "/campus-coordinator/instructors",
  },
  {
    id: "alumni",
    title: "Alumni",
    icon: <Icon icon="ion:school-sharp" />,
    navLink: "/campus-coordinator/alumni",
  },
  {
    id: "tuition-clearance",
    title: "Tuition & Clearance ",
    icon: <Icon icon="fa-regular:credit-card" />,
    navLink: "/campus-coordinator/tuition-clearance",
  },
  {
    id: "message-board",
    title: "Message Board",
    icon: <Icon icon="fluent:mail-24-filled" />,
    navLink: "/campus-coordinator/message-board",
  },

  {
    id: "chat",
    title: "Chat",
    icon: <Icon icon="heroicons-solid:chat-alt-2" />,
    navLink: "/campus-coordinator/chat",
  },
  {
    id: "events",
    title: "Events",
    icon: <Icon icon="bi:calendar2-event-fill" />,
    navLink: "/campus-coordinator/events",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/campus-coordinator/profile",
  },
  {
    id: "helpdesk",
    title: "Help Desk",
    icon: <Icon icon="ri:customer-service-2-line" />,
    navLink: "/campus-coordinator/helpdesk",
  },
  //   {
  //     id: "dashboards",
  //     title: "Dashboards",
  //     icon: <Home size={20} />,
  //     badge: "light-warning",
  //     badgeText: "2",
  //     children: [
  //       {
  //         id: "analyticsDash",
  //         title: "Analytics",
  //         icon: <Circle size={12} />,
  //         navLink: "/student/courses",
  //       },
  //       {
  //         id: "eCommerceDash",
  //         title: "eCommerce",
  //         icon: <Circle size={12} />,
  //         navLink: "/student/courses",
  //       },
  //     ],
  //   },
].map((p) => ({ ...p, action: "read", resource: "CampusCoordinators" }));
