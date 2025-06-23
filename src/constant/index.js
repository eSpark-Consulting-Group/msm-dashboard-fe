import {
  dashboardIcon,
  devicesIcon,
  userIcon,
  supportIcon,
  reportIcon,
  settingsIcon,
  logoutIcon,
} from "../assets";

export const sidebarTabs = [
  {
    icon: dashboardIcon,
    title: "Dashboard",
    link: "/",
  },
  {
    icon: devicesIcon,
    title: "Devices",
    link: "/devices",
  },
  {
    icon: userIcon,
    title: "Users",
    link: "/users",
  },
  {
    icon: supportIcon,
    title: "Support",
    link: "/support",
  },
  {
    icon: reportIcon,
    title: "Report",
    link: "/reports",
  },
  {
    icon: settingsIcon,
    title: "Settings",
    link: "/settings",
  },
  {
    icon: logoutIcon,
    title: "Logout",
    link: "/logout",
  },
];
