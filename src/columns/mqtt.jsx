// columns.js
export const generateColumns = (data) => {
  if (!data || data.length === 0) return [];

  return Object.keys(data[0]).map((key) => {
    const parts = key.split("_");

    const formatted = parts
      .map((part, index) => {
        if (index === 0) {
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        } else {
          return part.toUpperCase();
        }
      })
      .join("_");

      console.log(formatted, 'formatted')

    return {
      name: formatted,
      key: key,
    };
  });
};
