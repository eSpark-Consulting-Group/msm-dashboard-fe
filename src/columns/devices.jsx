export const columns = (role) => [
  { name: "Device Name", key: "name" },
  { name: "Device ID", key: "deviceId" },
  { name: "Group", key: "groups" },
  { name: "Created Time", key: "createdAt", sortable: true },
  { name: "Last Activity", key: "lastUpdated", sortable: true },
  { name: "Status", key: "status", chip: true, sortable: true },
  ...(role !== "user" ? [{ name: "Actions", key: "action" }] : []),
];
