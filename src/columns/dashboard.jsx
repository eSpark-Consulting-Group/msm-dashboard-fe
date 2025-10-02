export const columns = (role) => {
  const baseColumns = [
    { name: "Created Time", key: "createdAt", sortable: true },
    { name: "Device ID", key: "deviceId" },
    { name: "Device Name", key: "name" },
    { name: "Status", key: "status", chip: true, sortable: true },
    { name: "Group", key: "group" },
  ];

  if (role !== "user") {
    baseColumns.push({ name: "Actions", key: "action" });
  }

  return baseColumns;
};
