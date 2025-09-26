// columns.js
export const generateColumns = (data) => {
  if (!data || data.length === 0) return [];

  return Object.keys(data[0]).map((key) => ({
    name: key.replace(/_/g, " ").toUpperCase(), // Example: ip_address -> IP ADDRESS
    key: key,
  }));
};
