export const columns = () => {
  return [
    { name: "Created Time", key: "createdAt" },
    { name: "User Name", key: "userName", image: false },
    { name: "Costumer Name", key: "customer_name" },
    { name: "Email", key: "email" },
    { name: "Device ID", key: "deviceId" },
    { name: "Status", key: "status", chip: true },
    { name: "Actions", key: "action",  },
  ];
};
