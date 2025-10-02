export const columns = (role) => [
  { name: "Created Time", key: "createdAt" },
  { name: "Device ID", key: "deviceId" },
  { name: "Device Name", key: "name" },
  { name: "Group", key: "groups" },
  { name: "Status", key: "status", chip: true },
  ...(role !== "user" ? [{ name: "Actions", key: "action" }] : []),
];
