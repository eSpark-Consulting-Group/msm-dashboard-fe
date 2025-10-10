export const deviceGroupColumns = (role) => [
  { name: "Name", key: "name" },
  { name: "Description", key: "description" },
  { name: "Created Time", key: "createdAt", sortable: true },
  ...(role !== "user" ? [{ name: "Actions", key: "action" }] : []),
];
