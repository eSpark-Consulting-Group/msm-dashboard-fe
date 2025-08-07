import { Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./layout/auth-layout";
import PrivateLayout from "./layout/private-layout";
import {
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
} from "./pages";
import DashboardInfo from "./pages/dashboard/dashboardInfo";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard/:id/info" element={<DashboardInfo />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/dashboard/:id/home" element={<DashboardHome />} />
          <Route
            path="/dashboard/:id/info/:channelId"
            element={<ChannelInfo />}
          />
          <Route path="/dashboard/:mqttName" element={<MqttProtocol />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Router;
