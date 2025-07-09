import {
  dashboardIcon,
  devicesIcon,
  userIcon,
  supportIcon,
  reportIcon,
  settingsIcon,
  logoutIcon,
  user,
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

export const userTableData = [
  {
    userName: {
      image: user,
      name: "Liya",
    },
    email: "abc@espar.com",
    status: {
      label: "In active",
      variant: "red",
    },
    deviceId: {
      label: "123456",
      variant: "outlined",
    },
    addedOn: "2 June ,2025",
    access: "Read",
  },
  {
    userName: {
      image: user,
      name: "Liya",
    },
    email: "abc@espar.com",
    status: {
      label: "In active",
      variant: "red",
    },
    deviceId: {
      label: "123456",
      variant: "outlined",
    },
    addedOn: "2 June ,2025",
    access: "Read",
  },
  {
    userName: {
      image: user,
      name: "Liya",
    },
    email: "abc@espar.com",
    status: {
      label: "In active",
      variant: "red",
    },
    deviceId: {
      label: "123456",
      variant: "outlined",
    },
    addedOn: "2 June ,2025",
    access: "Read",
  },
  {
    userName: {
      image: user,
      name: "Liya",
    },
    email: "abc@espar.com",
    status: {
      label: "In active",
      variant: "red",
    },
    deviceId: {
      label: "123456",
      variant: "outlined",
    },
    addedOn: "2 June ,2025",
    access: "Read",
  },
  {
    userName: {
      image: user,
      name: "Liya",
    },
    email: "abc@espar.com",
    status: {
      label: "In active",
      variant: "red",
    },
    deviceId: {
      label: "123456",
      variant: "outlined",
    },
    addedOn: "2 June ,2025",
    access: "Read",
  },
  {
    userName: {
      image: user,
      name: "Liya",
    },
    email: "abc@espar.com",
    status: {
      label: "In active",
      variant: "red",
    },
    deviceId: {
      label: "123456",
      variant: "outlined",
    },
    addedOn: "2 June ,2025",
    access: "Read",
  },
  {
    userName: {
      image: user,
      name: "Liya",
    },
    email: "abc@espar.com",
    status: {
      label: "In active",
      variant: "red",
    },
    deviceId: {
      label: "123456",
      variant: "outlined",
    },
    addedOn: "2 June ,2025",
    access: "Read",
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

export const infoData = [
  { label: "DEVICE ID", value: "IND10000480" },
  { label: "DEVICE IMEI", value: "865788062393172" },
  { label: "DEVICE IP", value: "183.171.213.34" },
  { label: "MQTT STATUS", value: "Server Connected" },
  { label: "SFTP STATUS", value: "No Connection" },
];

export const networkProtocol = [
  { label: "IND10000570-2", value: "SERVER 01", showIcon: true },
  { label: "IND10000570-2", value: "SERVER 02", showIcon: true },
  { label: "IND10000570-2", value: "SERVER 03", showIcon: true },
];

export const mqttProtocol = [
  { label: "BROKER-IP", value: "Things Board", showIcon: true },
  { label: "BROKER-PORT", value: "1883", showIcon: true },
  { label: "BROKER-USER", value: "OFP-INDKOM", showIcon: true },
  { label: "BROKER-PASS", value: "IND10", showIcon: true },
  { label: "DATA-INTERVAL", value: "60 SEC", showIcon: true },
  { label: "MQTT_TOPIC", value: "v1/devices/me/telemetry", showIcon: true },
];

export const sftp = [
  {
    label: "SERVER_IP",
    value: "ap-southeast-1.sftpcloud.io",
    showIcon: true,
  },
  { label: "SERVER_PORT", value: "22", showIcon: true },
  { label: "USERNAME", value: "ofp-msm", showIcon: true },
  { label: "PASSWORD", value: "root123456", showIcon: true },
  { label: "DATA INTERVAL", value: "900", showIcon: true },
];
