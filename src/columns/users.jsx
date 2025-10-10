export const columns = () => {
  return [
    { name: "User Name", key: "userName", image: false },
    { name: "Customer Name", key: "customer_name" },
    { name: "Email", key: "email" },
    {
      name: "Groups",
      key: "tags",
      chipArray: true,
    },
    { name: "No of Devices", key: "total_devices_count", sortable: true },
    { name: "Created Time", key: "createdAt", sortable: true },
    { name: "Status", key: "status", chip: true, sortable: true },
    { name: "Actions", key: "action" },
  ];
};
