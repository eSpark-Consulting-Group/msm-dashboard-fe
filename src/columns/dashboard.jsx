export const columns = (role, statusSort, createdSort, updatedSort) => {
  const baseColumns = [
    { name: "Device Name", key: "name" },
    { name: "Device ID", key: "deviceId" },
    { name: "Group", key: "group" },
    {
      name: "Created Time",
      key: "createdAt",
      sortable: true,
      sortDir: createdSort,
    },
    {
      name: "Last Activity",
      key: "lastUpdated",
      sortable: true,
      sortDir: updatedSort,
    },
    { name: "Status", key: "status", chip: true },
  ];

  if (role !== "user") {
    baseColumns.push({ name: "Actions", key: "action" });
  }

  return baseColumns;
};
