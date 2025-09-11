export const columns = () => {
  return [
    { name: "Created Time", key: "createdAt" },
    { name: "Device ID", key: "deviceId" },
    { name: "Device Name", key: "deviceName" },
    { name: "Label", key: "label" },
    { name: "User Name", key: "userName" },
    { name: "Group", key: "group" },
    { name: "Status ", key: "status", chip: true },
    { name: "Actions", key: "action" },
  ];
};
