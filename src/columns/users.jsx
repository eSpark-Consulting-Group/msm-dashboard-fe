export const columns = () => {
  return [
    { name: "Created Time", key: "addedOn" },
    { name: "First Name", key: "userName", image: false },
    { name: "Costumer Name", key: "costumerName" },
    { name: "Email", key: "email" },
    { name: "Device ID", key: "deviceId", chip: true },
    { name: "Status", key: "status", chip: true },
    { name: "Actions", key: "action",  },
  ];
};
