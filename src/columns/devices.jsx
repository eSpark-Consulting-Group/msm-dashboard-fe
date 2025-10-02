export const columns = () => {
  return [
    { name: "Created Time", key: "createdAt", sortable: true },
    { name: "Device ID", key: "deviceId" },
    { name: "Device Name", key: "name" },
    // { name: "Label", key: "label" },
    // { name: "User Name", key: "mqtt_username" },
    { name: "Group", key: "groups" },
    { name: "Status", key: "status", chip: true, sortable: true },
    { name: "Actions", key: "action" },
  ];
};
