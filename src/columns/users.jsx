export const columns = () => {
  return [
    { name: "Created Time", key: "createdAt", sortable: true },
    { name: "User Name", key: "userName", image: false },
    { name: "Customer Name", key: "customer_name" },
    { name: "Email", key: "email" },
    { name: "No of Devices", key: "total_devices_count", sortable: true },
    { name: "Status", key: "status", chip: true, sortable: true },
    {
      name: "Groups",
      key: "tags",
      chipArray: true,
    },
    { name: "Actions", key: "action" },
  ];
};
