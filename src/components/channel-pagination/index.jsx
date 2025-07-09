import { Box, Typography } from "@mui/material";
import { paginationBack, paginationForward } from "../../assets";

const ChannelPagination = ({ channelName }) => {
  return (
    <Box sx={{ display: "flex", columnGap: "10px" }}>
      <Box
        sx={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          boxShadow: "0px 0px 4px 0px #00000040",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={paginationBack} alt="Icon" />
      </Box>
      <Box
        sx={{
          height: "33px",
          width: "137px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(180deg, #0C89E2 0%, #357AF6 117.76%)",
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            color: "#ffffff",
            fontWeight: "600",
            textTransform: "capitalize",
          }}
        >
          {channelName?.replace(/-/g, " ")}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          boxShadow: "0px 0px 4px 0px #00000040",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={paginationForward} alt="Icon" />
      </Box>
    </Box>
  );
};

export default ChannelPagination;
