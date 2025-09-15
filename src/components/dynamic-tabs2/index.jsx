import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";

const DynamicTabs2 = ({ tabs, defaultActive, onTabChange, linksTab }) => {
  const [activeTab, setActiveTab] = useState(defaultActive || 0);

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
            label={tab.label}
            sx={{
              textTransform: "none",
              fontWeight: "600",

              minHeight: "40px",
              color: "#A6A7A7", // default inactive color
              "&.Mui-selected": {
                color: "#0C89E2", // active color
              },
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
