// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from '@iconify/react';


export default [
  {
    header: "AlumniAdmin",
  },
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Icon icon="ep:menu" />,
    navLink: "/alumni-admin/dashborad",
  },
  {
    id: "connectCare",
    title: "Connect & Care",
    icon: <Icon icon="ri:hearts-fill" />,
    navLink: "/alumni-admin/connect-care",
  },
  {
    id: "alumniConnect",
    title: "alumni Connect",
    icon: <Icon icon="ion:school-sharp" />,
    navLink: "/alumni-admin/alumni-connect",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Icon icon="heroicons-solid:chat-alt-2" />,
    navLink: "/alumni-admin/chat",
  },
  {
    id: "events",
    title: "Events",
    icon: <Icon icon="bi:calendar2-event-fill" />,
    navLink: "/alumni-admin/events",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/alumni-admin/profile",
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
