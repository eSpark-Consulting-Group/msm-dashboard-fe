export const prepareHeaders = (headers) => {
  const token = localStorage.getItem("msm_token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

export const baseUrl = import.meta.env.VITE_BASE_URL;
