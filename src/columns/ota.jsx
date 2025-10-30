export const columns = (role) => [
    { name: "Device Name", key: "name" },
    { name: "Device ID", key: "deviceId" },
    { name: "Current Version", key: "version" },
    { name: "Last Update ", key: "lastUpdated", sortable: true },
    { name: "Status", key: "status", chip: true, sortable: true },
];
