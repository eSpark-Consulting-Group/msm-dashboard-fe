export const columns = (role) => [
  { name: "Created Time", key: "createdAt", sortable: true },
  { name: "Device ID", key: "deviceId" },
  { name: "Device Name", key: "name" },
  { name: "Group", key: "groups" },
  { name: "Status", key: "status", chip: true, sortable: true },
  ...(role !== "user" ? [{ name: "Actions", key: "action" }] : []),
];
