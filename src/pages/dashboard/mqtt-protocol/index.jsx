import { generateColumns } from "../../../columns/mqtt";
import { Box, LinearProgress, Typography } from "@mui/material";
import {
  DynamicTable,
  DynamicTabs2,
  NavigateHeader,
} from "../../../components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetAllProtocolsQuery } from "../../../services/protocol";
import { useDispatch, useSelector } from "react-redux";
import MeterReadingConfigPopover from "../../../components/meter-reading-modal";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HistoryIcon from "@mui/icons-material/History";
import { useSocket } from "../../../SocketTest";
import {
  addCurrentData,
  addMqttDataState,
  addMqttMessage,
  addMqttProtocol,
  handleMqttDisconnect,
} from "../../../store/slices/mqtt";
import {
  useGetAssignDeviceByIdQuery,
  useGetDeviceByIdQuery,
} from "../../../services/devices";
import { addDeviceStatus } from "../../../store/slices/devices";

const MqttProtocol = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(13);
  const [total, setTotal] = useState(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { currentDevice } = useSelector((state) => state?.devices);
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
  const { emitEvent, socket } = useSocket();
  const { data: protocolData, isLoading: protocolLoading } =
    useGetAllProtocolsQuery({ device_uuid: id }, { skip: !id });

  const {
    data: deviceData,
    isLoading: deviceLoading,
    isError: isDeviceError,
    error: deviceError,
  } = useGetDeviceByIdQuery(id, {
    skip: !id || user?.role?.name === "user",
    refetchOnMountOrArgChange: true,
  });

  const {
    data: deviceData2,
    isLoading: deviceLoading2,
    isError: isDeviceError2,
    error: deviceError2,
  } = useGetAssignDeviceByIdQuery(id, {
    skip: !id || user?.role?.name !== "user",
    refetchOnMountOrArgChange: true,
  });

  // ✅ Subscribe to MQTT once when component mounts
  useEffect(() => {
    if (!id || !socket) return;

    if (socket.connected && currentDevice !== false) {
      // send immediately if connected
      emitEvent("mqtt_protocol", {
        thing_name: id,
        interval_time: 5 * 1000,
        data_range: 5,
      });
      console.log("📤 Sent mqtt_protocol immediately");
    } else if (currentDevice !== false) {
      // wait for connection
      socket.once("connect", () => {
        emitEvent("mqtt_protocol", {
          thing_name: id,
          interval_time: 5 * 1000,
          data_range: 5,
        });
        console.log("📤 Sent mqtt_protocol after connect");
      });
    }

    dispatch(addMqttProtocol(5));
    if (currentDevice !== false) {
      dispatch(addMqttMessage("Realtime - 5 seconds"));
    }

    return () => {
      // ✅ Notify server to stop MQTT protocol
      dispatch(handleMqttDisconnect());
      setData([]);
      socket.emit("mqtt_protocol_stop", { thing_name: id });

      // ✅ Local cleanup
      // socket.off("mqtt_protocol");
      console.log("🧹 MqttProtocol cleanup done & mqtt_protocol_stop emitted");
    };
  }, [id, emitEvent, dispatch, socket, currentDevice]);

  // ✅ Manage table data updates
  useEffect(() => {
    if (dataState === 1) {
      setData(mqttDataHistory);
      setColumns(generateColumns(mqttDataHistory));
    } else if (dataState === 0) {
      setData(mqttData);
      setColumns(generateColumns(mqttData));
    }
  }, [mqttData, mqttDataHistory, dataState]);

  const handleTabChange = (newIndex) => {
    setActiveTab(newIndex);
    if (newIndex === 1) {
      navigate(`/dashboard/${id}/${state?.myVar || "info"}`);
    }
  };

  useEffect(() => {
    if (deviceData2) {
      dispatch(addDeviceStatus(data?.device_data?.device_data?.device_status));
      dispatch(
        addCurrentData(
          data?.device_data?.device_data?.device_status === false ? 1 : 0
        )
      );
      dispatch(
        addMqttDataState(
          data?.device_data?.device_data?.device_status === false ? 1 : 0
        )
      );
    }
  }, [deviceData2]);

  useEffect(() => {
    if (deviceData) {
      dispatch(addDeviceStatus(deviceData?.data?.device_data?.device_status));
      dispatch(
        addCurrentData(
          deviceData?.data?.device_data?.device_status === false ? 1 : 0
        )
      );
      dispatch(
        addMqttDataState(
          deviceData?.data?.device_data?.device_status === false ? 1 : 0
        )
      );
    }
  }, [deviceData]);

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
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={0.5}
              border="1px solid grey"
              p={0.5}
              borderRadius={2}
            >
              <AccessTimeIcon fontSize="small" />
              <Typography
                sx={{
                  fontSize: "12.28px",
                  fontWeight: "400",
                  color: "#667085",
                  cursor: "pointer",
                }}
              >
                {mqttMessage}
              </Typography>
            </Box>
          ) : (
            <Box
              display="flex"
              alignItems="center"
              gap={0.5}
              p={0.5}
              borderRadius={2}
              border="1px solid grey"
            >
              <HistoryIcon fontSize="small" />
              <Typography
                sx={{
                  fontSize: "12.28px",
                  fontWeight: "400",
                  color: "#667085",
                  cursor: "pointer",
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
