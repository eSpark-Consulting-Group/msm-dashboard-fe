export const columns = (statusSort, updatedSort) => [
  { name: "Device Name", key: "name" },
  { name: "Device ID", key: "deviceId" },
  { name: "Current Version", key: "version" },
  {
    name: "Last Update ",
    key: "lastUpdated",
    sortable: true,
    sortDir: updatedSort,
  },
  { name: "Status", key: "status", chip: true },
];
