import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import { authApi } from "../services/auth";

const store = configureStore({
  reducer: {
    auth,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
