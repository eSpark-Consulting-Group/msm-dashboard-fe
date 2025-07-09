import { Box, Paper, Typography } from "@mui/material";
import {
  ChannelPagination,
  DynamicTabs,
  NavigateHeader,
} from "../../../../components";
import { backIcon } from "../../../../assets";
import General from "./general";
import Power from "./power";
import Energy from "./energy";
import { useLocation, useNavigate } from "react-router-dom";

const ChannelInfo = () => {
  const tabs = [
    { label: "General", component: <General /> },
    { label: "Power", component: <Power /> },
    { label: "Energy", component: <Energy /> },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/");
  const channelName = path[path.length - 1];
  return (
    <Box>
      <NavigateHeader />
      <Box
        sx={{
          p: "9px 16.69px 9.11px 16px",
          borderRadius: "10.05px",
          background: "linear-gradient(180deg, #0077FF 0%, #004799 100%)",
          border: "0.84px solid #0C89E2",
          display: "flex",
          width: "fit-content",
          m: "30px 0px 10px 30px",
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        <img src={backIcon} alt="Icon" />
        <Typography sx={{ fontSize: "17px", color: "#FFFFFF" }}>
          Back
        </Typography>
      </Box>
      <Paper sx={{ padding: { xs: "10px 0px", lg: "30px" } }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <DynamicTabs tabs={tabs} />
          <ChannelPagination channelName={channelName} />
        </Box>
      </Paper>
    </Box>
  );
};

export default ChannelInfo;
