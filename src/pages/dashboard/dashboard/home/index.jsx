import { Box, Paper, Typography } from "@mui/material";
import { info } from "../../../../assets";
import { homeFlashCards } from "../../../../constant";
import { NavigateHeader, Channels, DynamicTabs2 } from "../../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const DashboardHome = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNavigate = (channelId) => {
    navigate(
      `/dashboard/${id}/info/channel-${channelId}`
    );
  };

  const handleInfo = () => {
    navigate(`/dashboard/${id}/info`);
  };

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (newIndex) => {
    setActiveTab(newIndex);
    if (newIndex == 0) {
      navigate(`/dashboard/${id}`, { state: { myVar: "home" } });
    } else {
      navigate(`/dashboard/${id}/home`);
    }
  };

  return (
    <Box>
      <NavigateHeader />
      <DynamicTabs2
        tabs={[
          { id: 1, label: "Dashboard 1", content: <></> },
          {
            id: 2,
            label: "Dashboard 2",
            content: <></>,
          },
        ]}
        linksTab={true}
        defaultActive={activeTab}
        onTabChange={handleTabChange}
      />
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
