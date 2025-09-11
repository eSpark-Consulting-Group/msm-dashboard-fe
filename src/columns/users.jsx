export const columns = () => {
  return [
    {
      name: "Created Time",
      key: "createdAt",
      render: (value) => (value ? new Date(value).toLocaleString() : "N/A"),
    },
    {
      name: "First Name",
      key: "name", 
      image: false,
    },
    {
      name: "Customer Name", 
      key: "customer_name",
    },
    {
      name: "Email",
      key: "email",
    },
    {
      name: "Device ID",
      key: "_id", 
      chip: true,
      render: (value) => (value ? value.substring(0, 8) + "..." : "N/A"), 
    },
    {
      name: "Status",
      key: "status",
      chip: true,
      render: (value) =>
        value ? value.charAt(0).toUpperCase() + value.slice(1) : "Unknown",
    },
    {
      name: "Actions",
      key: "action",
    },
  ];
};
