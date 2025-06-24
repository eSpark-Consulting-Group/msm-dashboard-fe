export const columns = () => {
  return [
    { name: "User Name", key: "userName", image: true },
    { name: "Email", key: "email" },
    { name: "Status", key: "status", chip: true },
    { name: "Device IDs", key: "deviceId", chip: true },
    { name: "Added On", key: "addedOn" },
    { name: "Access", key: "access" },
    { name: "Actions", key: "action" },
  ];
};
