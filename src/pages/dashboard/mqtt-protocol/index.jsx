import { generateColumns } from "../../../columns/mqtt";
import { Box, LinearProgress, Typography } from "@mui/material";
import {
  Button,
  DynamicTable,
  DynamicTabs2,
  NavigateHeader,
  SubHeader,
} from "../../../components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetAllProtocolsQuery } from "../../../services/protocol";
import { useSelector } from "react-redux";

const MqttProtocol = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(13);
  const [total, setTotal] = useState(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const { user } = useSelector((state) => state.auth);

  console.log(user);

  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();

  const { data: protocolData, isLoading: protocolLoading } =
    useGetAllProtocolsQuery({ device_uuid: id }, { skip: !id });

  useEffect(() => {
    if (protocolData?.data?.length > 0) {
      const apiData = protocolData.data;

      setTotal(apiData.length);
      setData(apiData);
      setColumns(generateColumns(apiData));
    }
  }, [protocolData]);

  const handleTabChange = (newIndex) => {
    setActiveTab(newIndex);
    if (newIndex == 1) {
      navigate(`/dashboard/${id}/${state?.myVar || "info"}`);
    }
  };

  return (
    <>
      <NavigateHeader />
      <DynamicTabs2
        tabs={[
          { id: 1, label: "Dashboard 1", content: <></> },
          { id: 2, label: "Dashboard 2", content: <></> },
        ]}
        linksTab={true}
        defaultActive={0}
        onTabChange={handleTabChange}
      />

      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "3px" }}>
        <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
          MQTTS PROTOCOL
        </Typography>
        <Typography
          sx={{ fontSize: "12.28px", fontWeight: "400", color: "#667085" }}
        >
          Realtime - last 30 minutes
        </Typography>
      </Box>

      {!protocolLoading && protocolData?.data?.length === 0 ? (
        <Typography>No Data Found</Typography>
      ) : (
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
          {protocolLoading ? (
            <LinearProgress />
          ) : (
            <DynamicTable
              data={data}
              columns={columns}
              isLoading={protocolLoading}
              page={page}
              pageSize={pageSize}
              handlePageChange={setPage}
              total={total}
              mqttTable={true}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default MqttProtocol;
