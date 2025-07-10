import { Box, Paper, Typography } from "@mui/material";
import { info } from "../../../../assets";
import { homeFlashCards } from "../../../../constant";
import { NavigateHeader, Channels } from "../../../../components";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newLocation = location.pathname
    .split("/")
    .filter((item) => item !== "");

  const handleNavigate = (id) => {
    navigate(
      `/dashboard/${newLocation[1]}/info/channel-${id > 9 ? "" : "0"}${id}`
    );
  };

  const handleInfo = () => {
    navigate(`/dashboard/${newLocation[1]}/info`);
  };
  return (
    <Box>
      <NavigateHeader />
      <Box
        sx={{
          background: "linear-gradient(180deg, #0095FF 0%, #0886E0 100%)",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          p: "6px 20px",
          display: "flex",
          columnGap: "10px",
          width: "fit-content",
          ml: "30px",
          border: "1px solid #0077FF",
          mt: "30px",
          cursor: "pointer",
        }}
        onClick={handleInfo}
      >
        <img src={info} alt="Icon" />
        <Typography
          sx={{ fontSize: "21px", fontWeight: "500", color: "#ffffff" }}
        >
          Info
        </Typography>
      </Box>
      <Paper sx={{ padding: "30px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            rowGap: "35px",
            columnGap: "40px",
          }}
        >
          {homeFlashCards?.map((item, index) => (
            <Channels
              variant={item?.variant}
              name={item?.name}
              key={index}
              onClick={() => handleNavigate(item?.id)}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default DashboardHome;
