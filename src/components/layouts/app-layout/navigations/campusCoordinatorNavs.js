// ** Icons Import
import { Home, Circle, Mail, MessageSquare } from "react-feather";

export default [
  {
    header: "Campus Coordinator",
  },
  {
    id: "dashboard",
    title: "Dashboard",
    icon: <Mail size={20} />,
    navLink: "/campus-coordinator/dahsboard",
  },
  {
    id: "students",
    title: "Students",
    icon: <MessageSquare size={20} />,
    navLink: "/campus-coordinator/students",
  },
  {
    id: "instructors",
    title: "Instructors",
    icon: <MessageSquare size={20} />,
    navLink: "/campus-coordinator/instructors",
  },
  {
    id: "alumni",
    title: "Alumni",
    icon: <MessageSquare size={20} />,
    navLink: "/campus-coordinator/alumni",
  },
  {
    id: "tuition-clearance",
    title: "Tuition & Clearance ",
    icon: <MessageSquare size={20} />,
    navLink: "/campus-coordinator/tuition-clearance",
  },
  {
    id: "message-board",
    title: "Message Board",
    icon: <MessageSquare size={20} />,
    navLink: "/campus-coordinator/",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <MessageSquare size={20} />,
    navLink: "/campus-coordinator/chat",
  },
  {
    id: "events",
    title: "Events",
    icon: <MessageSquare size={20} />,
    navLink: "/campus-coordinator/events",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <MessageSquare size={20} />,
    navLink: "/campus-coordinator/profile",
  },
  {
    id: "helpdesk",
    title: "Help Desk",
    icon: <MessageSquare size={20} />,
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
//   {
//     header: "Partners",
//   },
];
