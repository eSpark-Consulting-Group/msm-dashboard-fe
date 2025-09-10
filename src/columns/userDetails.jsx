export const columns = () => {
  return [
    { name: "Created Time", key: "createdTime" },
    { name: "Device ID", key: "deviceId" },
    { name: "Device Name", key: "deviceName" },
    { name: "Label", key: "label" },
    { name: "Customer Name", key: "customerName" },
    { name: "Group", key: "group" },
    { name: "Status ", key: "status", chip: true },
    { name: "Actions", key: "action" },
  ];
};
