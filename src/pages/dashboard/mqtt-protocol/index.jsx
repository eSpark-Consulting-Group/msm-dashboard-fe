import { generateColumns } from "../../../columns/mqtt";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import {
  DynamicTable,
  DynamicTabs2,
  NavigateHeader,
} from "../../../components";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetAllProtocolsQuery } from "../../../services/protocol";
import { useDispatch, useSelector } from "react-redux";
import MeterReadingConfigPopover from "../../../components/meter-reading-modal";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HistoryIcon from "@mui/icons-material/History";
import { useSocket } from "../../../SocketTest";
import { addMqttMessage, addMqttProtocol } from "../../../store/slices/mqtt";

const MqttProtocol = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(13);
  const [total, setTotal] = useState(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    mqttData,
    mqttDataHistory,
    dataState,
    mqttMessage,
    mqttDataHistoryLoading,
  } = useSelector((state) => state.mqtt);

  const [activeTab, setActiveTab] = useState(0);
  const [isOpenRealTimePopup, setIsOpenRealTimePopup] = useState(null);

  const navigate = useNavigate();
  const { emitEvent } = useSocket();
  const { data: protocolData, isLoading: protocolLoading } =
    useGetAllProtocolsQuery({ device_uuid: id }, { skip: !id });

  // useEffect(() => {
  //   // console.log(protocolData.protocolsByRank, "protocolData");
  //   if (protocolData?.protocolsByRank?.length > 0) {
  //     const apiData = protocolData.protocolsByRank;
  //     // console.log([apiData], "apiData");
  //     const rows = apiData.map((item) => item.data);

  //     setData(rows);
  //     setColumns(generateColumns(rows));
  //   }
  // }, [protocolData]);

  useEffect(() => {
    if (!id) return; // ✅ guard against missing id

    emitEvent("mqtt_protocol", {
      thing_name: id,
      interval_time: 5 * 1000,
      data_range: 5,
    });

    dispatch(addMqttProtocol(5));
    dispatch(addMqttMessage("Realtime 5 seconds"));
  }, [id, emitEvent, dispatch]);

  useEffect(() => {
    if (dataState === 1) {
      const rows = mqttDataHistory.map((item) => item.data);
      setData(rows);
      setColumns(generateColumns(rows));
    } else if (dataState === 0) {
      setData(mqttData);
      setColumns(generateColumns(mqttData));
    }
  }, [mqttData, mqttDataHistory, dataState]);

  const handleTabChange = (newIndex) => {
    setActiveTab(newIndex);
    if (newIndex == 1) {
      navigate(`/dashboard/${id}/${state?.myVar || "info"}`);
    }
  };

  const handleOpen = (e) => setIsOpenRealTimePopup(e.currentTarget);

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
        <Box
          onClick={handleOpen}
          sx={{
            width: "fit-content",
            color: "#667085",
          }}
        >
          {dataState === 0 ? (
            <Box
              display={"flex"}
              flexDirection={"row"}
              alignItems={"center"}
              gap={0.5}
            >
              <AccessTimeIcon fontSize="small" />
              <Typography
                sx={{
                  width: "fit-content",
                  fontSize: "12.28px",
                  fontWeight: "400",
                  color: "#667085",
                  height: "17px",
                }}
              >
                {mqttMessage}
              </Typography>
            </Box>
          ) : (
            <Box
              display={"flex"}
              direction={"row"}
              alignItems={"center"}
              gap={0.5}
            >
              <HistoryIcon fontSize="small" />
              <Typography
                sx={{
                  width: "fit-content",
                  fontSize: "12.28px",
                  fontWeight: "400",
                  color: "#667085",
                  height: "17px",
                }}
              >
                {mqttMessage}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      <MeterReadingConfigPopover
        id={id}
        open={Boolean(isOpenRealTimePopup)}
        anchorEl={isOpenRealTimePopup}
        setAnchorEl={setIsOpenRealTimePopup}
      />

      {!mqttDataHistoryLoading &&
      protocolData?.protocolsByRank?.length === 0 ? (
        <></>
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
            overflow: "auto",
          }}
        >
          {mqttDataHistoryLoading ? (
            <LinearProgress />
          ) : (
            <DynamicTable
              data={data}
              columns={columns}
              isLoading={
                dataState === 0 && data?.length === 0
                  ? true
                  : mqttDataHistoryLoading
              }
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
