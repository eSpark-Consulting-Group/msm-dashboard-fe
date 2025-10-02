import { configureStore } from "@reduxjs/toolkit";
import auth from "./slices/auth";
import users from "./slices/users";
import groups from "./slices/group";
import dashboards from "./slices/dashboard";
import devices from "./slices/devices";
import telemetry from "./slices/telemetry";
import mqtt from "./slices/mqtt";
import { authApi } from "../services/auth";

const store = configureStore({
  reducer: {
    auth,
    users,
    groups,
    dashboards,
    devices,
    telemetry,
    mqtt,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
