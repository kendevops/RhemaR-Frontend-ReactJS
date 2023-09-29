// ** Icons Import
//import { Home, Circle, Mail, MessageSquare } from "react-feather";
import { Icon } from '@iconify/react';


export default [
  {
    header: "Register",
  },
  {
    id: "home",
    title: "Home",
    icon: <Icon icon="fontisto:angle-dobule-down" />,
    navLink: "/register/home",
  },
  {
    id: "apply",
    title: "Apply",
    icon: "",
    navLink: "/register/apply",
  },
  {
    id: "admissions",
    title: "Admissions",
    icon: <Icon icon="fontisto:angle-dobule-down" />,
    navLink: "/register/admissions",
  },
  {
    id: "academics",
    title: "Academics",
    icon: <Icon icon="fontisto:angle-dobule-down" />,
    navLink: "/register/academics",
  },
  {
    id: "students",
    title: "Students",
    icon: <Icon icon="fontisto:angle-dobule-down" />,
    navLink: "/register/students",
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
