import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const DynamicTabs = ({ tabs, onTabChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromQuery = searchParams.get("tab");
  const [selectedIndex, setSelectedIndex] = useState(0);

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
          bgcolor: "#f5f5f5",
          borderRadius: "8px",
          p: 0.5,
          display: "inline-flex",
        }}
      >
        <Tabs
          sx={{
            padding: "5px",
            backgroundColor: "#EFEFEF",
            border: "1px solid #DBD6D6",
            borderRadius: "8px",
          }}
          value={selectedIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
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
                mx: 0.5,
                minHeight: 0,
                height: 36,
                width: 131,
                minWidth: 80,
                px: 2,
                color: selectedIndex === index ? "#fff !important" : "#888",
                bgcolor: selectedIndex === index ? "#0C89E2" : "transparent",
                border: selectedIndex === index ? "2px solid #2383C8" : "none",
                "&:hover": {
                  bgcolor: selectedIndex === index ? "" : "#e0e0e0",
                },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box marginY={2} paddingX={2} sx={{ width: "100%" }}>
        {typeof selectedTab?.component === "function" ? (
          <selectedTab.component {...(selectedTab.props || {})} />
        ) : (
          selectedTab.component
        )}
      </Box>
    </>
  );
};

export default DynamicTabs;
