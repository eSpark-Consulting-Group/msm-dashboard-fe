export const columns = (role, statusSort, createdSort, updatedSort) => [
  { name: "Device Name", key: "name" },
  { name: "Device ID", key: "deviceId" },
  { name: "Group", key: "groups" },
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
  ...(role !== "user" ? [{ name: "Actions", key: "action" }] : []),
];
