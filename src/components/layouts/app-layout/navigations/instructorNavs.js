// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from '@iconify/react';


export default [
  {
    header: "Instructor",
  },
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Icon icon="ep:menu" />,
    navLink: "/instructor/dashboards",
  },
  {
    id: "instructor",
    title: "Instructor",
    icon: <Icon icon="fa-solid:chalkboard-teacher" />,
    navLink: "/instructor/instructor",
  },
  {
    id: "courses",
    title: "Courses",
    icon: <Icon icon="bi:collection-fill" />,
    navLink: "/instructor/courses",
  },

  {
    id: "chat",
    title: "Chat",
    icon: <Icon icon="heroicons-solid:chat-alt-2" />,
    navLink: "/instructor/chat",
  },
  {
    id: "events",
    title: "Events",
    icon: <Icon icon="bi:calendar2-event-fill" />,
    navLink: "/instructor/events",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/instructor/profile",
  },
  {
    id: "helpdesk",
    title: "Help Desk",
    icon: <Icon icon="ri:customer-service-2-line" />,
    navLink: "/instructor/help-desk",
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
