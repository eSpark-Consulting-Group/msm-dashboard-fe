export const deviceGroupColumns = (role) => [
  { name: "Created Time", key: "createdAt", sortable: true },
  { name: "Name", key: "name" },
  { name: "Description", key: "description" },
  ...(role !== "user" ? [{ name: "Actions", key: "action" }] : []),
];
