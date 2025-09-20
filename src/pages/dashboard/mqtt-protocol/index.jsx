import { Box, LinearProgress, Typography } from "@mui/material";
import {
  Button,
  DynamicTable,
  DynamicTabs2,
  NavigateHeader,
  SubHeader,
} from "../../../components";
import { useEffect, useState } from "react";
import { columns } from "../../../columns/mqtt";
import { mqttTableData } from "../../../constant";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetAllProtocolsQuery } from "../../../services/protocol";

const MqttProtocol = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(13);
  const [total, setTotal] = useState(null);
  const [data, setData] = useState([]);

  const {
    data: protocolData,
    isLoading: protocolLoading,
    isError,
    error,
  } = useGetAllProtocolsQuery({ device_uuid: id }, { skip: !id });

  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleTabChange = (newIndex) => {
    setActiveTab(newIndex);
    if (newIndex == 1) {
      navigate(`/dashboard/${id}/${state?.myVar || "info"}`);
    }
  };

  useEffect(() => {
    if (protocolData) {
      setTotal(protocolData?.data?.length);
      const data = protocolData?.data?.map((item) => ({
        timestamp: item?.createdAt,
        date: item?.date,
        time: item?.time,
        V_R: item?.V_R,
        In1_R1: item?.In1_R1,
        In1_RPF: item?.In1_RPF,
        V_Y: item?.V_Y,
        In1_Y1: item?.In1_Y1,
        In1_YPF: item?.In1_YPF,
        V_B: item?.V_B,
        In1_B1: item?.In1_B1,
        In1_BPF: item?.In1_BPF,
        P1_R: item?.P1_R,
        P1_Y: item?.P1_Y,
        P1_B: item?.P1_B,
        P1: item?.P1,
        Q1_R: item?.Q1_R,
        Q1_Y: item?.Q1_Y,
        Q1_B: item?.Q1_B,
        Q1: item?.Q1,
        S1_R: item?.S1_R,
        S1_Y: item?.S1_Y,
        "S1 V_R": item?.["S1 V_R"],
        S1_B: item?.S1_B,
        S1: item?.S1,
      }));
      setData(data);
    }
  }, [protocolData]);

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
              columns={columns()}
              isLoading={false}
              page={page}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
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
