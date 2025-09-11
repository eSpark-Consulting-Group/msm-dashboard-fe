import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import users from "./slices/users";
import groups from "./slices/group";
import dashboards from "./slices/dashboard";
import { authApi } from "../services/auth";

const store = configureStore({
  reducer: {
    auth,
    users,
    groups,
    dashboards,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
