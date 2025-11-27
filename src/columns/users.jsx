export const columns = (statusSort, createdSort, countSort) => {
  return [
    { name: "User Name", key: "userName", image: false },
    { name: "Customer Name", key: "customer_name" },
    { name: "Email", key: "email" },
    {
      name: "Groups",
      key: "tags",
      chipArray: true,
    },
    { name: "No of Devices", key: "total_devices_count", sortable: true, sortDir: countSort },
    { name: "Created Time", key: "createdAt", sortable: true, sortDir: createdSort },
    { name: "Status", key: "status", chip: true, sortable: false, sortDir: statusSort },
    { name: "Actions", key: "action" },
  ];
};
