// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from '@iconify/react';


export default [
  {
    header: "PartnerAdmin",
  },
  {
    id: "dashboards",
    title: "Dashboards",
    icon: <Icon icon="ep:menu" />,
    navLink: "/partner-admin/dashboards",
  },
  {
    id: "partnerRegistration",
    title: "Partner Registration",
    icon: <Icon icon="teenyicons:users-solid" />,
    navLink: "/partner-admin/partner-registration",
  },
  {
    id: "donation",
    title: "Donation",
    icon: <Icon icon="bxs:donate-heart" />,
    navLink: "/partner-admin/donation",
  },
  {
    id: "communication",
    title: "Communication",
    icon: <Icon icon="heroicons-solid:speakerphone" />,
    navLink: "/partner-admin/communication",
  },
  {
    id: "resources",
    title: "Resources",
    icon: <Icon icon="fa-solid:copy" />,
    navLink: "/partner-admin/resources",
  },
  {
    id: "chat",
    title: "Chat",
    icon: <Icon icon="heroicons-solid:chat-alt-2" />,
    navLink: "/partner-admin/chat",
  },
  {
    id: "events",
    title: "Events",
    icon: <Icon icon="bi:calendar2-event-fill" />,
    navLink: "/partner-admin/events",
  },
  {
    id: "myProfile",
    title: "My Profile",
    icon: <Icon icon="bxs:user-circle" />,
    navLink: "/partner-admin/my-profile",
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
