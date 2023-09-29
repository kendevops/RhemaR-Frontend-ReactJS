// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from "@iconify/react";

export default [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Icon icon="ep:menu" />,
    navLink: "/student-services-admin/dashboard",
  },
  {
    id: "applications",
    title: "Applications Management",
    icon: <Icon icon="teenyicons:users-solid" />,
    navLink: "/student-services-admin/applications",
  },
  {
    id: "students",
    title: "Students Management",
    icon: <Icon icon="teenyicons:users-solid" />,
    navLink: "/student-services-admin/students",
  },

  // {
  //   id: "student-services-admin",
  //   title: "Students Services Admin",
  //   icon: <Icon icon="teenyicons:users-solid" />,
  //   navLink: "/student-services-admin/student-services-admin",
  // },
  {
    id: "defered-applications",
    title: "Defered Applications",
    icon: <Icon icon="teenyicons:users-solid" />,
    navLink: "/student-services-admin/defered-applications",
  },
  {
    id: "elearning-management",
    title: "E-Learning Management",
    icon: <Icon icon="fa-solid:chalkboard-teacher" />,
    navLink: "/student-services-admin/elearning-management",
  },
  {
    id: "course-management",
    title: "Course Management",
    icon: <Icon icon="ion:school-sharp" />,
    navLink: "/student-services-admin/course-management",
  },
  {
    id: "schedule-management",
    title: "Schedule Management",
    icon: <Icon icon="fluent:mail-24-filled" />,
    navLink: "/student-services-admin/schedule-management",
  },
  // {
  //   id: "instructors",
  //   title: "Instructors",
  //   icon: <Icon icon="fa-solid:chalkboard-teacher" />,
  //   navLink: "/student-services-admin/instructors",
  // },
  // {
  //   id: "alumni",
  //   title: "Alumni",
  //   icon: <Icon icon="ion:school-sharp" />,
  //   navLink: "/student-services-admin/alumni",
  // },
  // {
  //   id: "tuition-clearance",
  //   title: "Tuition & Clearance ",
  //   icon: <Icon icon="fa-regular:credit-card" />,
  //   navLink: "/student-services-admin/tuition-clearance",
  // },
  // {
  //   id: "message-board",
  //   title: "Message Board",
  //   icon: <Icon icon="fluent:mail-24-filled" />,
  //   navLink: "/student-services-admin/message-board",
  // },

  // {
  //   id: "chat",
  //   title: "Chat",
  //   icon: <Icon icon="heroicons-solid:chat-alt-2" />,
  //   navLink: "/student-services-admin/chat",
  // },
  // {
  //   id: "events",
  //   title: "Events",
  //   icon: <Icon icon="bi:calendar2-event-fill" />,
  //   navLink: "/student-services-admin/events",
  // },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/student-services-admin/profile",
  },
  // {
  //   id: "helpdesk",
  //   title: "Help Desk",
  //   icon: <Icon icon="ri:customer-service-2-line" />,
  //   navLink: "/student-services-admin/helpdesk",
  // },
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
