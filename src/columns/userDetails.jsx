export const columns = () => {
  return [
    { name: "Device Name", key: "name" },
    { name: "Device ID", key: "deviceId" },
    { name: "Group", key: "groups" },
    { name: "Created Time", key: "createdAt" },
    // { name: "Label", key: "label" },
    // { name: "User Name", key: "mqtt_username" },
    { name: "Status ", key: "status", chip: true },
    { name: "IMEI Status", key: "imei_status" },
    { name: "Actions", key: "action" },
  ];
};
