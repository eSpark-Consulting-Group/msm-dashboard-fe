import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./sidebar";
import Header from "./header";

const PrivateLayout = () => {
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("msm_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar open={open} setOpen={setOpen} />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: "calc(100vw - 290px)",
        }}
      >
        <Header open={open} setOpen={setOpen} />
        <Box
          sx={{
            flex: 1,
            maxHeight: "calc(100vh - 61px)",
            overflowY: "auto",
            padding: "16px 24px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PrivateLayout;
