import { Box, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DynamicTabs = ({ tabs, onTabChange, width, maxWidth }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromQuery = searchParams.get("tab");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (tabs.length === 0) return;

    const queryIndex = parseInt(tabFromQuery);
    const isValidIndex =
      !isNaN(queryIndex) && queryIndex >= 0 && queryIndex < tabs.length;
    const newIndex = isValidIndex ? queryIndex : 0;

    setSelectedIndex(newIndex);
    if (!isValidIndex && tabFromQuery !== null) {
      setSearchParams({ tab: newIndex });
    }
  }, [tabFromQuery, tabs]);

  const handleTabChange = (event, newIndex) => {
    setSelectedIndex(newIndex);
    setSearchParams({ tab: newIndex });
    if (onTabChange) onTabChange(tabs[newIndex]);
  };

  const selectedTab = tabs[selectedIndex];

  if (tabs.length === 0) return null;
  return (
    <>
      <Box
        sx={{
          borderRadius: "8px",
          p: 0.5,
          display: "flex",
          justifyContent: "center",
          width: { xs: "100%", sm: width },
        }}
      >
        <Box sx={{ width: "100%", maxWidth }}>
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
        {tabs.map((tab, index) => (
          <Box
            key={tab.id || index}
            sx={{ display: selectedIndex === index ? "block" : "none" }}
          >
            {typeof tab.component === "function" ? (
              <tab.component {...(tab.props || {})} />
            ) : (
              tab.component
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default DynamicTabs;
