// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from '@iconify/react';


export default [
  {
    header: "Students",
  },
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Icon icon="ep:menu" />,
    navLink: "/student/courses",
  },
  {
    id: "courses",
    title: "Courses",
    icon: <Icon icon="bi:collection-fill" />,
    navLink: "/student/courses",
  },
  {
    id: "downloads",
    title: "Downloads",
    icon: <Icon icon="akar-icons:download" />,
    navLink: "/student/courses",
  },
  {
    id: "tution&clearance",
    title: "Tution & Clearance",
    icon: <Icon icon="fa-regular:credit-card" />,
    navLink: "/student/courses",
  },
  {
    id: "events",
    title: "Events",
    icon: <Icon icon="bi:calendar2-event-fill" />,
    navLink: "/student/courses",
  },
  {
    id: "profile",
    title: "Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/student/courses",
  },
  {
    id: "helpdesk",
    title: "Help Desk",
    icon: <Icon icon="ri:customer-service-2-line" />,
    navLink: "/student/courses",
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
