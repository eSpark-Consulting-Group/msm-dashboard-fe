import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const token = localStorage.getItem("msm_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;
