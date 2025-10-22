import { generateColumns } from "../../../columns/mqtt";
import { Box, LinearProgress, Typography } from "@mui/material";
import {
  Button,
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
  const { currentDevice, selectedDevice } = useSelector(
    (state) => state?.devices
  );
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
  const { emitEvent, socket, stopEvent } = useSocket();
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

  useEffect(() => {
    if (
      user?.role?.name === "user"
        ? selectedDevice?.device_data?.device_data?.device_status !== false
        : selectedDevice?.device_data?.device_status !== false
    ) {
      dispatch(addMqttMessage("Realtime - 5 sec"));
    }
  }, [selectedDevice]);

  // ✅ Subscribe to MQTT once when component mounts
  useEffect(() => {
    if (!id || !socket) return;

    const sendMqttEvent = () => {
      emitEvent(
        "mqtt_protocol",
        {
          thing_name: id,
          interval_time: 5 * 1000,
          data_range: 5,
        },
        true
      );
      console.log("📤 mqtt_protocol event sent");
    };

    // ✅ If socket is already connected
    if (socket.connected) {
      sendMqttEvent();
    } else {
      // ✅ Wait for socket connection (will also work on page refresh)
      socket.once("connect", () => {
        console.log("🔌 Socket connected (refresh case)");
        sendMqttEvent();
      });
    }

    // ✅ Always clean up on unmount
    return () => {
      stopEvent("mqtt_protocol_stop", { thing_name: id });
      console.log("🧹 Cleaned up mqtt_protocol");
      dispatch(handleMqttDisconnect());
    };
  }, [id, socket]);

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
      const data = deviceData2?.data;
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
            MQTTS PROTOCOL
          </Typography>
          {dataState === 1 && data?.length > 0 && !mqttDataHistoryLoading && (
            <Box sx={{ width: "200px" }}>
              <Button
                variant="contained"
                disableRipple
                onClick={() => {
                  if (!data?.length) return;

                  // 1️⃣ Prepare CSV headers
                  const headers = Object.keys(data[0]);

                  const formatHeader = (header) => {
                    const parts = header.split("_");
                    if (parts.length > 1) {
                      const last = parts.pop();
                      return `${parts.join("_")}(${last})`;
                    }
                    return header;
                  };

                  const csvRows = [];
                  csvRows.push(headers.map(formatHeader).join(","));

                  data.forEach((row) => {
                    const values = headers.map((header) => {
                      const cell = row[header] ?? "";
                      // Escape double quotes
                      return `"${String(cell).replace(/"/g, '""')}"`;
                    });
                    csvRows.push(values.join(","));
                  });

                  // 3️⃣ Join all rows
                  const csvContent = csvRows.join("\n");

                  // 4️⃣ Create blob & trigger download
                  const blob = new Blob([csvContent], {
                    type: "text/csv;charset=utf-8;",
                  });
                  const url = URL.createObjectURL(blob);

                  const link = document.createElement("a");
                  link.href = url;

                  // Optional: add timestamped filename
                  const now = new Date();
                  const formattedTime = now.toISOString().replace(/[:.]/g, "-");
                  link.download = `device_data_${formattedTime}.csv`;

                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Export CSV
              </Button>
            </Box>
          )}
        </Box>
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
    </>
  );
};

export default MqttProtocol;
