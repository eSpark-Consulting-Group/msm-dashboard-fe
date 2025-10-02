export const columns = () => {
  return [
    { name: "Created Time", key: "createdAt", sortable: true },
    { name: "Device ID", key: "deviceId" },
    { name: "Device Name", key: "name" },
    { name: "Status", key: "status", chip: true, sortable: true },
    { name: "Group", key: "group" },
    { name: "Actions", key: "action" },
  ];
};
