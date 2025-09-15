import { Box, Button, Card, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import NavigateHeader from "../navigate-header";
import DynamicTabs2 from "../dynamic-tabs2";
import { useState } from "react";

const DashboardWrapper = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/");
  const dynamicId = path[2];
  const [activeTab, setActiveTab] = useState(1);

  const handleHome = () => {
    navigate(`/dashboard/${dynamicId}/home`);
  };

  const handleTabChange = (newIndex) => {
    setActiveTab(newIndex);
    if (newIndex == 0) {
      navigate(`/dashboard/123`);
    }
  };

  return (
    <>
      <NavigateHeader />
      <DynamicTabs2
        tabs={[
          { id: 1, label: "MQTT", content: <></> },
          {
            id: 2,
            label: "INFO",
            content: <></>,
          },
        ]}
        linksTab={true}
        defaultActive={activeTab}
        onTabChange={handleTabChange}
      />
      <Box
        sx={{
          bgcolor: "#f9f5f3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
          position: "relative",
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 1090,
            borderRadius: 3,
            boxShadow: 3,
            p: 4,
            position: "relative",
            overflow: "visible",
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -45,
              right: 20,
              width: 136,
              height: 45,
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to right, #0095FF, #0886E0)",
                gap: "8px",
                border: "1px solid #0077FF",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }}
              onClick={handleHome}
            >
              <img
                src="/src/assets/icons/home.svg"
                alt="Home"
                width={18}
                height={18}
                style={{ display: "inline-block" }}
              />{" "}
              Home
            </Button>
          </Box>

          {children}
        </Card>
      </Box>
    </>
  );
};

export default DashboardWrapper;
