export const columns = (role) => {
  const baseColumns = [
    { name: "Device Name", key: "name" },
    { name: "Device ID", key: "deviceId" },
    { name: "Group", key: "group" },
    { name: "Created Time", key: "createdAt", sortable: true },
    { name: "Last Activity", key: "lastUpdated", sortable: true },
    { name: "Status", key: "status", chip: true, sortable: true },
  ];

  if (role !== "user") {
    baseColumns.push({ name: "Actions", key: "action" });
  }

  return baseColumns;
};
