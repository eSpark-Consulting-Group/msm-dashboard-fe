import { Box } from "@mui/material";
import { DynamicTable, NavigateHeader } from "../../../components";
import { useState } from "react";
import { columns } from "../../../columns/mqtt";
import { mqttTableData } from "../../../constant";

const MqttProtocol = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(13);
  const [total] = useState(13);
  const [data, setData] = useState([]);
  const handlePageChange = (page) => {
    setPage(page);
  };

  const repeatedData = Array(12).fill(mqttTableData[0]);

  return (
    <>
      <NavigateHeader />
      <Box
        sx={{
          backgroundColor: "#E9EFF6",
          width: "100%",
          height: "88%",
          mt: "10px",
          borderRadius: "8px",
          border: "1px solid #D8D8D8",
          p: "10px",
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
          onRowClick={(item) => handleRowClick(item)}
          mqttTable={true}
        />
      </Box>
    </>
  );
};

export default MqttProtocol;
