import { Box, Button, Card, LinearProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import NavigateHeader from "../navigate-header";
import DynamicTabs2 from "../dynamic-tabs2";
import { useState } from "react";
import { home, measurementIcon } from "../../assets";
import { useSelector } from "react-redux";

const DashboardWrapper = ({ loading, children }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  const { currentDevice, selectedDevice } = useSelector(
    (state) => state?.devices,
  );

  const { user } = useSelector((state) => state?.auth);

  const handleHome = () => {
    navigate(`/dashboard/${id}/home`);
  };

  const handleMeasurement = () => {
    navigate(`/dashboard/${id}/measurement`);
  };

  const handleTabChange = (newIndex) => {
    setActiveTab(newIndex);
    if (newIndex == 0) {
      navigate(`/dashboard/${id}`, { state: { myVar: "info" } });
    }
  };

  return (
    <>
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
            p: { xs: 2.5, md: 4 },
            position: "relative",
            overflow: "visible",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {selectedDevice === null ||
          (user?.role?.name === "user"
            ? selectedDevice?.device_data?.device_data?.device_status === false
            : selectedDevice?.device_data?.device_status === false) ? (
            <></>
          ) : (
            <>
              <Box
                sx={{
                  position: "absolute",
                  top: -45,
                  right: 100,
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
                    src={home}
                    alt="Home"
                    width={18}
                    height={18}
                    style={{ display: "inline-block" }}
                  />
                  &nbsp;Home
                </Button>
              </Box>
              {user?.role?.name === "super_admin" && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -45,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 200,
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
                      img: {
                        filter:
                          "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(185deg) brightness(104%) contrast(105%)",
                      },
                    }}
                    onClick={handleMeasurement}
                  >
                    <img
                      src={measurementIcon}
                      alt="Home"
                      width={18}
                      height={18}
                      style={{ display: "inline-block" }}
                    />
                    Measurement
                  </Button>
                </Box>
              )}
            </>
          )}

          {loading ? <LinearProgress sx={{ width: "100%" }} /> : children}
        </Card>
      </Box>
    </>
  );
};

export default DashboardWrapper;
