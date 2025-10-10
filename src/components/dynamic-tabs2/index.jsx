import { useEffect, useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { useSelector } from "react-redux";

const DynamicTabs2 = ({ tabs, defaultActive, onTabChange, linksTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActive || 0);
  const { user } = useSelector((state) => state?.auth);
  const { selectedDevice } = useSelector((state) => state?.devices);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    if (onTabChange) {
      onTabChange(newValue);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        centered
        TabIndicatorProps={{
          style: { backgroundColor: "#0C89E2", height: "3px" },
        }}
        sx={{
          borderBottom: "1px solid #D9D9D9",
          minHeight: "40px",
          width: linksTab ? "fit-content" : "auto",
        }}
        variant="standard"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            label={
              <Box
                component="span"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "10px",
                }}
              >
                <Typography
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                    color: index === activeTab ? "#0C89E2" : "#A6A7A7",
                  }}
                >
                  {tab.label}
                </Typography>
                {index === activeTab && (
                  <>
                    {user?.role?.name === "user"
                      ? selectedDevice?.device_data?.device_data
                          ?.device_status === false && (
                          <InfoOutlineIcon
                            sx={{ color: "red" }}
                            titleAccess="Device is Inactive"
                          />
                        )
                      : selectedDevice?.device_data?.device_status ===
                          false && (
                          <InfoOutlineIcon
                            sx={{ color: "red" }}
                            titleAccess="Device is Inactive"
                          />
                        )}
                  </>
                )}
              </Box>
            }
            sx={{
              textTransform: "none",
              minHeight: "40px",
              color: "#A6A7A7",
              "&.Mui-selected": { color: "#0C89E2" },
            }}
            disableRipple
          />
        ))}
      </Tabs>
      <Box sx={{ mt: 2 }}>{tabs[activeTab] && tabs[activeTab].content}</Box>
    </Box>
  );
};

export default DynamicTabs2;
