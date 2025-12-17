import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
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
  UserDetails,
  VerifyEmail,
  ResetPassword,
  Measurement,
  OTA,
} from "./pages";
import DashboardInfo from "./pages/dashboard/dashboardInfo";
import { useSelector } from "react-redux";

const Router = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard/:id/info" element={<DashboardInfo />} />
          <Route path="/devices" element={<Devices />} />
          {/* <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} /> */}
          {user?.role?.name !== "user" && (
            <>
              <Route path="/users" element={<Users />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/users/:id" element={<UserDetails />} />
              {/* <Route path="/measurement" element={<Measurement />} /> */}
              <Route path="/ota" element={<OTA />} />
            </>
          )}

          <Route path="/dashboard/:id/home" element={<DashboardHome />} />
          <Route path="/dashboard/:id/measurement" element={<Measurement />} />
          <Route
            path="/dashboard/:id/home/:channelId"
            element={<ChannelInfo />}
          />
          <Route path="/dashboard/:id" element={<MqttProtocol />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
