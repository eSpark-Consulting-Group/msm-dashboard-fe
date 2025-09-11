import {
  dashboardIcon,
  devicesIcon,
  userIcon,
  supportIcon,
  reportIcon,
  settingsIcon,
  logoutIcon,
  user,
  flashBlack,
  energy,
} from "../assets";

export const sidebarTabs = (role) => {
  return role === "user"
    ? [
        {
          icon: dashboardIcon,
          title: "Dashboard",
          link: "/",
        },
      ]
    : [
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
        // {
        //   icon: supportIcon,
        //   title: "Support",
        //   link: "/support",
        // },
        // {
        //   icon: reportIcon,
        //   title: "Report",
        //   link: "/reports",
        // },
        // {
        //   icon: settingsIcon,
        //   title: "Settings",
        //   link: "/settings",
        // },
        // {
        //   icon: logoutIcon,
        //   title: "Logout",
        //   link: "/logout",
        // },
      ];
};

export const userTableData = [
  {
    id: 1,
    userName: {
      image: user,
      name: "Kacey",
    },
    email: "Ceme@gm...",
    status: {
      label: "Active",
      variant: "green",
    },
    deviceId: {
      label: "IND1254..",
      variant: "simple",
    },
    addedOn: "2025-05-09 18:52:32",
    costumerName: "Cemeron",
  },
  {
    id: 2,
    userName: {
      image: user,
      name: "Kacey",
    },
    email: "Ceme@gm...",
    status: {
      label: "Active",
      variant: "green",
    },
    deviceId: {
      label: "IND1254..",
      variant: "simple",
    },
    addedOn: "2025-05-09 18:52:32",
    costumerName: "Cemeron",
  },
  {
    id: 3,
    userName: {
      image: user,
      name: "Kacey",
    },
    email: "Ceme@gm...",
    status: {
      label: "Active",
      variant: "green",
    },
    deviceId: {
      label: "IND1254..",
      variant: "simple",
    },
    addedOn: "2025-05-09 18:52:32",
    costumerName: "Cemeron",
  },
  {
    id: 4,
    userName: {
      image: user,
      name: "Kacey",
    },
    email: "Ceme@gm...",
    status: {
      label: "Active",
      variant: "green",
    },
    deviceId: {
      label: "IND1254..",
      variant: "simple",
    },
    addedOn: "2025-05-09 18:52:32",
    costumerName: "Cemeron",
  },
  {
    id: 5,
    userName: {
      image: user,
      name: "Kacey",
    },
    email: "Ceme@gm...",
    status: {
      label: "Active",
      variant: "green",
    },
    deviceId: {
      label: "IND1254..",
      variant: "simple",
    },
    addedOn: "2025-05-09 18:52:32",
    costumerName: "Cemeron",
  },
  {
    id: 6,
    userName: {
      image: user,
      name: "Kacey",
    },
    email: "Ceme@gm...",
    status: {
      label: "Active",
      variant: "green",
    },
    deviceId: {
      label: "IND1254..",
      variant: "simple",
    },
    addedOn: "2025-05-09 18:52:32",
    costumerName: "Cemeron",
  },
  {
    id: 7,
    userName: {
      image: user,
      name: "Kacey",
    },
    email: "Ceme@gm...",
    status: {
      label: "Active",
      variant: "green",
    },
    deviceId: {
      label: "IND1254..",
      variant: "simple",
    },
    addedOn: "2025-05-09 18:52:32",
    costumerName: "Cemeron",
  },
];

export const deviceData = [
  {
    id: "1",
    deviceId: "123456",
    area: "Place1",
    addedOn: "2025-05-09 18:52:32",
    assigned: { variant: "outlined", label: "2 Person" },
    status: { variant: "green", label: "Active" },
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    userName: "Kacy Deuce",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
    customerName: "Customer D",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    userName: "Kacy Deuce",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
    customerName: "Customer D",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    userName: "Kacy Deuce",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
    customerName: "Customer D",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    userName: "Kacy Deuce",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
    customerName: "Customer D",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    userName: "Kacy Deuce",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
    customerName: "Customer D",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    userName: "Kacy Deuce",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
    customerName: "Customer D",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    userName: "Kacy Deuce",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
    customerName: "Customer D",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    userName: "Kacy Deuce",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
    customerName: "Customer D",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    userName: "Kacy Deuce",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
    customerName: "Customer D",
  },
];

export const deviceGroupData = [
  {
    createdTime: "2025-05-09 18:52:32",
    name: "Office",
    description: "",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    name: "Office",
    description: "",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    name: "Office",
    description: "",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    name: "Office",
    description: "",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    name: "Office",
    description: "",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    name: "Office",
    description: "",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    name: "Office",
    description: "",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    name: "Office",
    description: "",
  },
  {
    createdTime: "2025-05-09 18:52:32",
    name: "Office",
    description: "",
  },
];

export const homeFlashCards = [
  { id: 1, variant: "unfilled", name: "Channel  01" },
  { id: 2, variant: "disable", name: "Channel  02" },
  { id: 3, variant: "connected", name: "Channel  03" },
  { id: 4, variant: "disconnect", name: "Channel  04" },
  { id: 5, variant: "disable", name: "Channel  05" },
  { id: 6, variant: "unfilled", name: "Channel  06" },
  { id: 7, variant: "unfilled", name: "Channel  07" },
  { id: 8, variant: "unfilled", name: "Channel  08" },
  { id: 9, variant: "unfilled", name: "Channel  09" },
  { id: 10, variant: "unfilled", name: "Channel  10" },
  { id: 11, variant: "disable", name: "Channel  11" },
  { id: 12, variant: "unfilled", name: "Channel  12" },
];

export const generalCards = [
  {
    icon: flashBlack,
    color: "red",
    heading: "PHASE A-RME VOLTAGE",
    time: "Last update 3h ago",
    value: "248.64V",
    valueColor: "red",
    headingSize: "20px",
  },
  {
    icon: flashBlack,
    color: "red",
    heading: "PHASE B-RME VOLTAGE",
    time: "Last update 3h ago",
    value: "248.63V",
    valueColor: "red",
    headingSize: "20px",
  },
  {
    icon: flashBlack,
    color: "red",
    heading: "PHASE C-RME VOLTAGE",
    time: "Last update 3h ago",
    value: "248.63V",
    valueColor: "red",
    headingSize: "20px",
  },
  {
    icon: flashBlack,
    color: "red",
    heading: "PHASE A-LINE VOLTAGE",
    time: "Last update 3h ago",
    value: "430.65V",
    valueColor: "red",
    headingSize: "20px",
  },
  {
    icon: flashBlack,
    color: "red",
    heading: "PHASE B-LINE VOLTAGE",
    time: "Last update 3h ago",
    value: "430.63V",
    valueColor: "red",
    headingSize: "20px",
  },
  {
    icon: flashBlack,
    color: "red",
    heading: "PHASE C-LINE VOLTAGE",
    time: "Last update 3h ago",
    value: "430.63V",
    valueColor: "red",
    headingSize: "20px",
  },
  {
    icon: energy,
    heading: "PHASE A-RMS CURRENT",
    value: "0A",
    valueColor: "green",
    headingSize: "20px",
  },
  {
    icon: energy,
    heading: "PHASE B-RMS CURRENT",
    value: "0A",
    valueColor: "green",
    headingSize: "20px",
  },
  {
    icon: energy,
    heading: "PHASE C-RMS CURRENT",
    value: "0A",
    valueColor: "green",
    headingSize: "20px",
  },
  {
    icon: flashBlack,
    color: "red",
    heading: "PHASE A-LINE FREQUENCY",
    time: "Last update 3h ago",
    value: "50.04Hz",
    valueColor: "red",
    headingSize: "17px",
  },
  {
    icon: flashBlack,
    color: "red",
    heading: "PHASE B-LINE FREQUENCY",
    time: "Last update 3h ago",
    value: "50.04Hz",
    valueColor: "red",
    headingSize: "17px",
  },
  {
    icon: flashBlack,
    color: "red",
    heading: "PHASE C-LINE FREQUENCY",
    time: "Last update 3h ago",
    value: "50.04Hz",
    valueColor: "red",
    headingSize: "17px",
  },
];

export const powerCards = [
  {
    icon: flashBlack,
    color: "green",
    heading: "PHASE A-Apparent Power",
    time: "Last update 3h ago",
    value: "0KVA",
    valueColor: "green",
    headingSize: "18.05px",
  },
  {
    icon: flashBlack,
    color: "green",
    heading: "PHASE B-Apparent Power",
    time: "Last update 3h ago",
    value: "0KVA",
    valueColor: "green",
    headingSize: "18.05px",
  },
  {
    icon: flashBlack,
    color: "green",
    heading: "PHASE C-Apparent Power",
    time: "Last update 3h ago",
    value: "0KVA",
    valueColor: "green",
    headingSize: "18.05px",
  },
  {
    icon: energy,
    heading: "PHASE A-Active Power",
    value: "0KW",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: energy,
    heading: "PHASE B-Active Power",
    value: "0KW",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: energy,
    heading: "PHASE C-Active Power",
    value: "0KW",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: flashBlack,
    color: "green",
    heading: "PHASE A-Reactive Power",
    time: "Last update 3h ago",
    value: "0KVAR",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: flashBlack,
    color: "green",
    heading: "PHASE B-Reactive Power",
    time: "Last update 3h ago",
    value: "0KVAR",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: flashBlack,
    color: "green",
    heading: "PHASE C-Reactive Power",
    time: "Last update 3h ago",
    value: "0KVAR",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: flashBlack,
    color: "green",
    heading: "PHASE A-Power factor",
    time: "Last update 3h ago",
    value: "0%",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: flashBlack,
    color: "green",
    heading: "PHASE B-Power factor",
    time: "Last update 3h ago",
    value: "0%",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: flashBlack,
    color: "green",
    heading: "PHASE C-Power factor",
    time: "Last update 3h ago",
    value: "0%",
    valueColor: "green",
    headingSize: "19.5px",
  },
];

export const energyCards = [
  {
    icon: energy,
    heading: "PHASE A-Active Energy (+)",
    value: "0KWh",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: energy,
    heading: "PHASE B-Active Energy (+)",
    value: "0KWh",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: energy,
    heading: "PHASE C-Active Energy (+)",
    value: "0KWh",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: energy,
    heading: "PHASE A-Active Energy (-)",
    value: "0KWh",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: energy,
    heading: "PHASE B-Active Energy (-)",
    value: "0KWh",
    valueColor: "green",
    headingSize: "19.5px",
  },
  {
    icon: energy,
    heading: "PHASE C-Active Energy (-)",
    value: "0KWh",
    valueColor: "green",
    headingSize: "19.5px",
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

export const dashboardData = [
  {
    id: "1",
    createdAt: "2025-05-09 18:52:32",
    title: "IND10000479-Dashboard 02",
    customerName: "",
    group: "",
  },
  {
    id: "2",
    createdAt: "2025-05-09 18:52:32",
    title: "IND10000479-Dashboard 02",
    customerName: "",
    group: "",
  },
  {
    id: "3",
    createdAt: "2025-05-09 18:52:32",
    title: "IND10000479-Dashboard 02",
    customerName: "",
    group: "",
  },
  {
    id: "4",
    createdAt: "2025-05-09 18:52:32",
    title: "IND10000479-Dashboard 02",
    customerName: "",
    group: "",
  },
  {
    id: "5",
    createdAt: "2025-05-09 18:52:32",
    title: "IND10000479-Dashboard 02",
    customerName: "",
    group: "",
  },
  {
    id: "6",
    createdAt: "",
    title: "",
    customerName: "",
    group: "",
  },
  {
    id: "7",
    createdAt: "2025-05-09 18:52:32",
    title: "IND10000479-Dashboard 02",
    customerName: "",
    group: "",
  },
  {
    id: "8",
    createdAt: "2025-05-09 18:52:32",
    title: "IND10000479-Dashboard 02",
    customerName: "",
    group: "",
  },
  {
    id: "9",
    createdAt: "2025-05-09 18:52:32",
    title: "IND10000479-Dashboard 02",
    customerName: "",
    group: "",
  },
  {
    id: "10",
    createdAt: "2025-05-09 18:52:32",
    title: "IND10000479-Dashboard 02",
    customerName: "",
    group: "",
  },
  {
    id: "11",
    createdAt: "2025-05-09 18:52:32",
    title: "IND10000479-Dashboard 02",
    customerName: "",
    group: "",
  },
];

export const mqttTableData = [
  {
    timestamp: "",
    date: "",
    time: "",
    V_R: "",
    In1_R1: "",
    In1_RPF: "",
    V_Y: "",
    In1_Y1: "",
    In1_YPF: "",
    V_B: "",
    In1_B1: "",
    In1_BPF: "",
    P1_R: "",
    P1_Y: "",
    P1_B: "",
    Q1_R: "",
    Q1_Y: "",
    Q1_B: "",
    Q1: "",
    S1_R: "",
    S1_Y: "",
    "S1 V_R": "",
    S1_B: "",
    S1: "",
  },
];

export const userDetails = [
  {
    id: 1,
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    customerName: "Customers  D",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
  },
  {
    id: 2,
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    customerName: "Customers  D",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
  },
  {
    id: 3,
    createdTime: "2025-05-09 18:52:32",
    deviceId: "IND1254..",
    deviceName: "Temp Sen..",
    label: "Bus",
    customerName: "Customers  D",
    group: "Bus Device",
    status: {
      label: "In active",
      variant: "red",
    },
  },
];
