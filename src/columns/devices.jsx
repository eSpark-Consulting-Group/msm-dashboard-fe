export const columns = () => {
  return [
    { name: "Device ID", key: "deviceId", copy: true },
    { name: "Area", key: "area" },
    { name: "Added On", key: "addedOn" },
    { name: "Assigned to", key: "assigned", chip: true },
    { name: "Status", key: "status", chip: true },
    { name: "Actions", key: "action" },
  ];
};
