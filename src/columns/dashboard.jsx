export const columns = (role) => {
  const baseColumns = [
    { name: "Created Time", key: "createdAt" },
    { name: "Device ID", key: "deviceId" },
    { name: "Device Name", key: "name" },
    { name: "Group", key: "group" },
  ];

  if (role !== "user") {
    baseColumns.push({ name: "Actions", key: "action" });
  }

  return baseColumns;
};
