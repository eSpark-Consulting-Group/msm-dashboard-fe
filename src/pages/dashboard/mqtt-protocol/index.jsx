import { Box, Typography } from "@mui/material";
import {
  Button,
  DynamicTable,
  DynamicTabs2,
  NavigateHeader,
  SubHeader,
} from "../../../components";
import { useState } from "react";
import { columns } from "../../../columns/mqtt";
import { mqttTableData } from "../../../constant";
import { useNavigate } from "react-router-dom";

const MqttProtocol = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(13);
  const [total] = useState(13);
  const [data, setData] = useState([]);

  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleTabChange = (newIndex) => {
    setActiveTab(newIndex);
    if (newIndex == 1) {
      navigate(`/dashboard/123/info`);
    }
  };

  const repeatedData = Array(12).fill(mqttTableData[0]);

  return (
    <>
      <NavigateHeader />
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3px" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            sx={{ width: "max-content", minWidth: "160px" }}
            variant={"contained"}
            disableRipple
          >
            Add New Dashoard
          </Button>
        </Box>
        <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
          MQTT PROTOCOL
        </Typography>
        <Typography
          sx={{ fontSize: "12.28px", fontWeight: "400", color: "#667085" }}
        >
          Realtime - last 30 minutes
        </Typography>
      </Box>

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
          backgroundColor: "#E9EFF6",
          width: "100%",
          height: "auto",
          mt: "10px",
          borderRadius: "8px",
          border: "1px solid #D8D8D8",
          p: "10px",
          maxHeight: "700px",
        }}
      >
        <DynamicTable
          data={repeatedData}
          columns={columns()}
          isLoading={false}
          page={page}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          total={total}
          mqttTable={true}
        />
      </Box>
    </>
  );
};

export default MqttProtocol;
