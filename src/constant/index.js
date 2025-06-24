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

export const deviceData = [
  {
    id: "1",
    deviceId: "123456",
    area: "Place1",
    addedOn: "2 June ,2025",
    assigned: { variant: "outlined", label: "2 Person" },
    status: { variant: "green", label: "Active" },
  },
  {
    id: "2",
    deviceId: "123456",
    area: "Place1",
    addedOn: "2 June ,2025",
    assigned: { variant: "outlined", label: "2 Person" },
    status: { variant: "red", label: "In active" },
  },
];
