export const columns = () => {
  return [
    { name: "Created Time", key: "createdAt" },
    { name: "User Name", key: "userName", image: false },
    { name: "Costumer Name", key: "customer_name" },
    { name: "Email", key: "email" },
    { name: "No of Devices", key: "total_devices_count" },
    { name: "Status", key: "status", chip: true },
    { name: "Actions", key: "action",  },
  ];
};
