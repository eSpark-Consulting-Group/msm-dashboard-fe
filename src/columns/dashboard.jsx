export const columns = (
  role,
  statusSort,
  createdSort,
  updatedSort,
  nameSort,
  groupNameSort,
) => {
  const baseColumns = [
    {
      name: "Device Name",
      key: "name",
      sortable: role !== "user" ? true : false,
      sortDir: role !== "user" ? nameSort : "",
    },
    {
      name: "Device ID",
      key: "deviceId",
    },
    {
      name: "Group",
      key: "group",
      sortable: role !== "user" ? true : false,
      sortDir: role !== "user" ? groupNameSort : "",
    },
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
    { name: "IMEI Status", key: "imei_status" },
  ];

  if (role !== "user") {
    baseColumns.push({ name: "Actions", key: "action" });
  }

  return baseColumns;
};
