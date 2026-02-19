import {
  dashboardIcon,
  devicesIcon,
  userIcon,
  measurementIcon,
  otaIcon,
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
        {
          icon: devicesIcon,
          title: "Devices",
          link: "/devices",
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
        //   icon: measurementIcon,
        //   title: "Measurement",
        //   link: "/measurement",
        // },
        {
          icon: otaIcon,
          title: "OTA updates",
          link: "/ota",
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
    heading: "PHASE A-RMS VOLTAGE",
    time: "Last update 3h ago",
    value: "248.64V",
    valueColor: "red",
    headingSize: "20px",
  },
  {
    icon: flashBlack,
    color: "red",
    heading: "PHASE B-RMS VOLTAGE",
    time: "Last update 3h ago",
    value: "248.63V",
    valueColor: "red",
    headingSize: "20px",
  },
  {
    icon: flashBlack,
    color: "red",
    heading: "PHASE C-RMS VOLTAGE",
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
    time: "Last update 3h ago",
  },
  {
    icon: energy,
    heading: "PHASE B-RMS CURRENT",
    value: "0A",
    valueColor: "green",
    headingSize: "20px",
    time: "Last update 3h ago",
  },
  {
    icon: energy,
    heading: "PHASE C-RMS CURRENT",
    value: "0A",
    valueColor: "green",
    headingSize: "20px",
    time: "Last update 3h ago",
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
export const infoData = (realData) => {
  return [
    { label: "DEVICE ID", value: realData?.device_uuid, key: "device_uuid" },
    {
      label: "DEVICE PASSWORD",
      value: realData?.device_pass,
      key: "device_pass",
      password: true,
    },
    { label: "DEVICE IMEI", value: realData?.device_imei, key: "device_imei" },
    { label: "DEVICE IP", value: realData?.device_ip, key: "device_ip" },
    {
      label: "MQTT STATUS",
      value: realData?.mqtt_status ? "Server Connected" : "Server Disconnected",
      key: "mqtt_status",
    },
    {
      label: "SFTP STATUS",
      value: realData?.sftp_status ? "Server Connected" : "Server Disconnected",
      key: "sftp_status",
    },
    {
      label: "MQTTs STATUS",
      value: realData?.device_status
        ? "Server Connected"
        : "Server Disconnected",
      key: "mqtts_status",
    },
    {
      label: "GSM STATUS",
      value: realData?.gsm_status,
      key: "gsm_status",
    },
    {
      label: "NTP STATUS",
      value: realData?.ntp_status,
      key: "ntp_status",
    },
    {
      label: "Hardware Version",
      value: realData?.hardware_version || "-",
      key: "hardware_version",
    },
    {
      label: "Firmware Version",
      value: realData?.firmware_version || "-",
      key: "firmware_version",
    },
  ];
};

export const networkProtocol = (realData) => {
  return [
    {
      label: "Server 1",
      value: realData?.data?.server_1,
      key: "server_1",
      showIcon: true,
    },
    {
      label: "Server 2",
      value: realData?.data?.server_2,
      key: "server_2",
      showIcon: true,
    },
    {
      label: "Server 3",
      value: realData?.data?.server_3,
      key: "server_3",
      showIcon: true,
    },
  ];
};

export const mqttProtocol = (realData) => {
  const mainData = realData?.length > 0 ? realData[0] : {};
  return [
    {
      label: "BROKER-IP",
      value: mainData?.broker_ip,
      key: "broker_ip",
      showIcon: true,
    },
    {
      label: "BROKER-PORT",
      value: mainData?.broker_port,
      key: "broker_port",
      showIcon: true,
    },
    {
      label: "BROKER-USER",
      value: mainData?.broker_user,
      key: "broker_user",
      showIcon: true,
    },
    {
      label: "BROKER-PASS",
      value: mainData?.broker_pass
        ? "•".repeat(mainData.broker_pass.length)
        : "",
      key: "broker_pass",
      showIcon: true,
      value2: mainData?.broker_pass,
    },
    {
      label: "DATA-INTERVAL (Seconds)",
      value: mainData?.data_interval,
      key: "data_interval",
      showIcon: true,
    },
    {
      label: "MQTT-TOPIC",
      value: mainData?.mqtt_topic,
      key: "mqtt_topic",
      showIcon: true,
    },
  ];
};

export const sftp = (realData) => {
  return [
    {
      label: "SERVER_IP",
      value: realData?.server_ip,
      showIcon: true,
      key: "server_ip",
    },
    {
      label: "SERVER_PORT",
      value: realData?.server_port,
      showIcon: true,
      key: "server_port",
    },
    {
      label: "USERNAME",
      value: realData?.username,
      showIcon: true,
      key: "username",
    },
    {
      label: "PASSWORD",
      value: realData?.password ? "•".repeat(realData.password.length) : "",
      showIcon: true,
      key: "password",
      value2: realData?.password,
    },
    {
      label: "DATA INTERVAL (Seconds)",
      value: realData?.data_interval,
      showIcon: true,
      key: "data_interval",
    },
  ];
};

export const ctRatioData = () => {
  return [
    { label: "DEVICE ID", value: "1002121", key: "device_uuid" },
    { label: "DEVICE IMEI", value: "31231231", key: "device_imei" },
    { label: "DEVICE IP", value: "1323123123", key: "device_ip" },
    {
      label: "MQTT STATUS",
      value: true ? "Server Connected" : "No Connection",
      key: "mqtt_status",
    },
    {
      label: "SFTP STATUS",
      value: true ? "Server Connected" : "No Connection",
      key: "sftp_status",
    },
  ];
};

export const voltageData = () => {
  return [
    { label: "DEVICE ID", value: "1002121", key: "device_uuid" },
    { label: "DEVICE IMEI", value: "31231231", key: "device_imei" },
    { label: "DEVICE IP", value: "1323123123", key: "device_ip" },
    {
      label: "MQTT STATUS",
      value: true ? "Server Connected" : "No Connection",
      key: "mqtt_status",
    },
    {
      label: "SFTP STATUS",
      value: true ? "Server Connected" : "No Connection",
      key: "sftp_status",
    },
  ];
};

export const ccData = () => {
  return [
    { label: "DEVICE ID", value: "1002121", key: "device_uuid" },
    { label: "DEVICE IMEI", value: "31231231", key: "device_imei" },
    { label: "DEVICE IP", value: "1323123123", key: "device_ip" },
    {
      label: "MQTT STATUS",
      value: true ? "Server Connected" : "No Connection",
      key: "mqtt_status",
    },
    {
      label: "SFTP STATUS",
      value: true ? "Server Connected" : "No Connection",
      key: "sftp_status",
    },
  ];
};

export const mqttsProtocol = (realData) => {
  const data = realData || {};
  return [
    {
      label: "MQTTs_ENDPOINT",
      value: data?.broker_ip,
      key: "broker_ip",
      showIcon: true,
    },
    {
      label: "MQTTs_PORT",
      value: data?.broker_port,
      key: "broker_port",
      showIcon: true,
    },
    {
      label: "MQTTs_INTERVAL",
      value: data?.data_interval,
      key: "data_interval",
      showIcon: true,
    },
    {
      label: "CA1 cert",
      value: data?.root_ca === true,
      key: "root_ca",
      checkBox: true,
    },
    {
      label: "Claim cert",
      value: data?.claim_cert === true,
      key: "claim_cert",
      checkBox: true,
    },
    {
      label: "Claim key",
      value: data?.claim_key === true,
      key: "claim_key",
      checkBox: true,
    },
  ];
};

export const otaData = (realData) => {
  const data = realData || {};
  return [
    {
      label: "Current Version",
      value: data?.current_version || "-",
      key: "current_version",
    },
    {
      label: "Last Update",
      value: realData
        ? `${data?.last_update_date}T${data?.last_update_time}`
        : "-",
      key: "current_version",
    },
  ];
};

export const DEVICE_CONFIGURATION_COLUMNS = [
  { key: "name", label: "Name" },
  { key: "delay_time", label: "Delay Time" },
  { key: "minimum", label: "Min" },
  { key: "maximum", label: "Max" },
  { key: "percentage_value", label: "Percentage" },
  { key: "status", label: "Status" },
];

export const DEVICE_CONFIGURATION_FIELDS = [
  {
    title: "Voltage Unbalance",
    fields: [
      {
        label: "Voltage Unbalance Minimum",
        key: "voltage_unbalance_minimum",
        placeholder: "Voltage Unbalance Minimum",
        value: "",
      },
      {
        label: "Voltage Unbalance Maximum",
        key: "voltage_unbalance_maximum",
        placeholder: "Voltage Unbalance Maximum",
        value: "",
      },
      {
        label: "Voltage Unbalance Delay Time",
        key: "voltage_unbalance_delay_time",
        placeholder: "Voltage Unbalance Delay Time",
        value: "",
      },
      {
        label: "Voltage Unbalance Status",
        key: "voltage_unbalance_status",
        value: false,
        type: "switch",
      },
    ],
  },

  {
    title: "Voltage THD",
    fields: [
      {
        label: "Voltage THD Minimum",
        key: "voltage_thd_minimum",
        value: "",
      },
      {
        label: "Voltage THD Maximum",
        key: "voltage_thd_maximum",
        value: "",
      },
      {
        label: "Voltage THD Delay Time",
        key: "voltage_thd_delay_time",
        value: "",
      },
      {
        label: "Voltage THD Status",
        key: "voltage_thd_status",
        value: false,
        type: "switch",
      },
    ],
  },

  {
    title: "Current Unbalance",
    fields: [
      {
        label: "Current Unbalance Minimum",
        key: "current_unbalance_minimum",
        value: "",
      },
      {
        label: "Current Unbalance Maximum",
        key: "current_unbalance_maximum",
        value: "",
      },
      {
        label: "Current Unbalance Delay Time",
        key: "current_unbalance_delay_time",
        value: "",
      },
      {
        label: "Current Unbalance Status",
        key: "current_unbalance_status",
        value: false,
        type: "switch",
      },
    ],
  },

  {
    title: "Sustained Load Nameplate KVA",
    fields: [
      {
        label: "Sustained Load Nameplate KVA Value",
        key: "sustained_load_nameplate_kva_percentage_value",
        value: "",
      },
      {
        label: "Sustained Load Nameplate KVA Delay Time",
        key: "sustained_load_nameplate_kva_delay_time",
        value: "",
      },
      {
        label: "Sustained Load Nameplate KVA Status",
        key: "sustained_load_nameplate_kva_status",
        value: false,
        type: "switch",
      },
    ],
  },

  {
    title: "Power Factor Unbalance",
    fields: [
      {
        label: "Power Factor Unbalance Delay Time",
        key: "power_factor_unbalance_delay_time",
        value: "",
      },
      {
        label: "Power Factor Unbalance Status",
        key: "power_factor_unbalance_status",
        value: false,
        type: "switch",
      },
    ],
  },
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
