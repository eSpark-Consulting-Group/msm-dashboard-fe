import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

const DynamicTabs = ({ tabs, onTabChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedTab = tabs[selectedIndex];

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (event, index) => {
    setSelectedIndex(index);
    if (onTabChange) onTabChange(tabs[index]);
  };

  return (
    <>
      <Box
        sx={{
          borderRadius: "8px",
          p: 0.5,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 652 }}>
          <Tabs
            key={isMobile ? "mobile" : "desktop"}
            value={selectedIndex}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              padding: "5px",
              backgroundColor: "#EFEFEF",
              border: "1px solid #DBD6D6",
              borderRadius: "8px",
              width: "100%",
              "& .MuiTabs-scroller": {
                overflowX: "auto",
                scrollSnapType: "x mandatory",
              },
              "& .MuiTabs-flexContainer": {
                display: "inline-flex",
                scrollSnapType: "x mandatory",
                scrollPadding: "5px",
                margin: 0,
                gap: "35px",
              },
            }}
            slotProps={{
              indicator: {
                style: { display: "none" },
              },
            }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "8px",
                  minHeight: 0,
                  height: 36,
                  width: {
                    xs: "80px",
                    sm: "131px",
                  },
                  minWidth: 80,
                  px: 0,
                  mx: 0,
                  color: selectedIndex === index ? "#fff !important" : "#888",
                  bgcolor: selectedIndex === index ? "#0C89E2" : "transparent",
                  border:
                    selectedIndex === index ? "2px solid #2383C8" : "none",
                  "&:hover": {
                    bgcolor: selectedIndex === index ? "" : "#e0e0e0",
                  },
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                }}
              />
            ))}
          </Tabs>
        </Box>
      </Box>

      <Box marginY={2} paddingX={2} sx={{ width: "100%" }}>
        {typeof selectedTab.component === "function" ? (
          <selectedTab.component {...(selectedTab.props || {})} />
        ) : (
          selectedTab.component
        )}
      </Box>
    </>
  );
};

export default DynamicTabs;
