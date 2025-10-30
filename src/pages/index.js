import { lazy } from "react";

// Auth
const Login = lazy(() => import("./auth/login"));
const VerifyEmail = lazy(() => import("./auth/verify-email"));
const ResetPassword = lazy(() => import("./auth/reset-password"));

// Dashboard
const Dashboard = lazy(() => import("./dashboard/dashboard"));
const Devices = lazy(() => import("./dashboard/devices"));
const Reports = lazy(() => import("./dashboard/report"));
const Settings = lazy(() => import("./dashboard/settings"));
const Support = lazy(() => import("./dashboard/support"));
const Users = lazy(() => import("./dashboard/users"));
const AddUser = lazy(() => import("./dashboard/users/add-user"));
const DashboardHome = lazy(() => import("./dashboard/dashboard/home"));
const ChannelInfo = lazy(() => import("./dashboard/dashboard/channel-info"));
const MqttProtocol = lazy(() => import("./dashboard/mqtt-protocol"));
const UserDetails = lazy(() => import("./dashboard/users/user-details"));
const Measurement = lazy(() => import("./dashboard/measurement"));
const OTA = lazy(() => import("./dashboard/ota"));

export {
  Login,
  Dashboard,
  Devices,
  Reports,
  Settings,
  Support,
  Users,
  AddUser,
  DashboardHome,
  ChannelInfo,
  MqttProtocol,
  UserDetails,
  VerifyEmail,
  ResetPassword,
  Measurement,
  OTA,
};
