import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { Logo } from "../../components";
import { sidebarTabs } from "../../constant";
import { useClickOutside } from "../../utils";

const Sidebar = ({ open, setOpen }) => {
  const { pathname: path } = useLocation();
  let pathname = `/${path?.split("/")[1]}`;
  if (pathname[0] === "/") {
    pathname = pathname.slice(1);
  }
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    if (link === "/logout") {
      console.log("logout");
    } else {
      navigate(link);
    }
  };

  const sidebarRef = useRef();
  useClickOutside(sidebarRef, () => setOpen(false));

  return (
    <Box
      ref={sidebarRef}
      sx={{
        transition: "all 0.5s ease-in-out",
        position: { xs: "absolute", md: "relative" },
        zIndex: 99,
        left: open ? "0px" : { xs: "-290px", md: 0 },
        top: 0,
        minWidth: "290px",
        background: "#fff",
        height: "100vh",
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        gap: "60px",
      }}
    >
      <Box sx={{ marginTop: "33px" }}>
        <Logo />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          gap: "14px",
          width: "224px",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {sidebarTabs("admin").map((item) => (
          <Box
            onClick={() => handleNavigate(item.link)}
            sx={{
              width: "100%",
              height: "40px",
              borderRadius: "8px",
              padding: "5px 30px 5px 8px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "10px",
              background:
                pathname === item.title?.toLowerCase() ||
                (pathname === "" && item?.title?.toLowerCase() === "dashboard")
                  ? "#0077FF"
                  : "#FFF",
              cursor: "pointer",
              img: {
                filter:
                  pathname === item.title?.toLowerCase() ||
                  (pathname === "" &&
                    item?.title?.toLowerCase() === "dashboard")
                    ? "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(185deg) brightness(104%) contrast(105%)"
                    : "",
              },
              ":hover": {
                background:
                  pathname === item.title?.toLowerCase() ||
                  (pathname === "" &&
                    item?.title?.toLowerCase() === "dashboard")
                    ? "#0077FF"
                    : "#0077FF",
                "& .MuiTypography-root": {
                  color: "#FFF",
                },
                img: {
                  filter:
                    "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(185deg) brightness(104%) contrast(105%)",
                },
              },
            }}
            key={item.title}
          >
            <img src={item.icon} alt={item.title} />
            <Typography
              color={
                pathname === item.title?.toLowerCase() ||
                (pathname === "" && item?.title?.toLowerCase() === "dashboard")
                  ? "text.secondary"
                  : "text.primary"
              }
              fontSize={18}
              fontWeight={400}
            >
              {item.title}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Sidebar;
