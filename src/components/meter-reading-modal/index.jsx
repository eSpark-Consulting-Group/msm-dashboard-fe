import * as React from "react";
import { Box, Button, Popover, Tabs, Tab, Divider } from "@mui/material";
import RealtimeConfig from "../meter-reading-realtime";
import HistoryConfig from "../meter-reading-history";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useSocket } from "../../SocketTest";
import { useSelector, useDispatch } from "react-redux";
import {
  addCurrentData,
  addMqttDataState,
  addMqttHistoryData,
  addMqttMessage,
  addMqttProtocol,
  handleMqttLoading,
} from "../../store/slices/mqtt";
import { useLazyGetAllProtocolsQuery } from "../../services/protocol";
// ---------- DATA ----------
export const METER_READING_MODAL_DATA = {
  timezones: [
    "UTC−12:00",
    "UTC−11:00",
    "UTC−10:00",
    "UTC−09:30",
    "UTC−09:00",
    "UTC−08:00",
    "UTC−07:00",
    "UTC−06:00",
    "UTC−05:00",
    "UTC−04:00",
    "UTC−03:30",
    "UTC−03:00",
    "UTC−02:00",
    "UTC−01:00",
    "UTC+00:00",
    "UTC+01:00",
    "UTC+02:00",
    "UTC+03:00",
    "UTC+03:30",
    "UTC+04:00",
    "UTC+04:30",
    "UTC+05:00",
    "UTC+05:30",
    "UTC+05:45",
    "UTC+06:00",
    "UTC+06:30",
    "UTC+07:00",
    "UTC+08:00",
    "UTC+08:45",
    "UTC+09:00",
    "UTC+09:30",
    "UTC+10:00",
    "UTC+10:30",
    "UTC+11:00",
    "UTC+12:00",
    "UTC+12:45",
    "UTC+13:00",
    "UTC+14:00",
  ],
  realtimeOptions: [5, 10, 15, 30, 60, 120, 300, 600, 900, 1800],
  historyOptions: [
    { label: "5 minutes", value: 5, unit: "minutes" },
    { label: "10 minutes", value: 10, unit: "minutes" },
    { label: "15 minutes", value: 15, unit: "minutes" },
    { label: "30 minutes", value: 30, unit: "minutes" },
    { label: "1 hour", value: 1, unit: "hour" },
    { label: "2 hours", value: 2, unit: "hour" },
    { label: "5 hours", value: 5, unit: "hour" },
    { label: "10 hours", value: 10, unit: "hour" },
    { label: "12 hours", value: 12, unit: "hour" },
    { label: "1 day", value: 1, unit: "day" },
    { label: "7 days", value: 7, unit: "day" },
    { label: "30 days", value: 30, unit: "day" },
  ],
  maxValues: {
    realtime: 200,
    history: 1000,
  },
};

// ---------- STYLE ----------
export const METER_READING_MODAL_STYLE = {
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 500,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
    display: "flex",
    flexDirection: "column",
  },
  tabsContainer: {
    backgroundColor: "#e8e8e8",
    borderRadius: "25px",
    "& .MuiTab-root": {
      color: "#828282",
      textTransform: "none",
      fontSize: "15px",
      minHeight: "32px",
      width: "50%",
    },
    "& .Mui-selected": {
      backgroundColor: "#0C89E2",
      color: "#fff !important",
      borderRadius: "25px",
    },
  },
  tabPill: {
    backgroundColor: "#e8e8e8",
    borderRadius: "25px",
    "& .MuiTab-root": {
      color: "#828282",
      textTransform: "none",
      minHeight: "25px",
      width: { xs: "50%", sm: "80px" },
    },
    "& .Mui-selected": {
      border: 1,
      borderColor: "#0C89E2",
      backgroundColor: "#fff",
      color: "#0C89E2",
      borderRadius: "25px",
    },
  },
  sectionBox: {
    p: 2,
    border: 1,
    borderColor: "divider",
    borderRadius: 1,
  },
  slider: { width: { xs: "80%", sm: 180 }, color: "#0C89E2" },
  numberInput: {
    width: { xs: "100%", sm: 80 },
    height: 45,
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
  },
  numberInputHistory: {
    width: { xs: "100%", sm: 140 },
    height: 45,
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
  },
  selectMenuProps: {
    PaperProps: { style: { maxHeight: 200, borderRadius: 0, padding: 0 } },
    MenuListProps: {
      sx: {
        "&::-webkit-scrollbar": { width: "6px" },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "8px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
      },
    },
  },
};

const MeterReadingConfigPopover = ({ open, anchorEl, id, setAnchorEl }) => {
  function getCurrentTimezoneOffset() {
    const offsetMinutes = new Date().getTimezoneOffset();
    const sign = offsetMinutes > 0 ? "-" : "+";
    const hours = String(Math.floor(Math.abs(offsetMinutes) / 60)).padStart(
      2,
      "0"
    );
    const minutes = String(Math.abs(offsetMinutes) % 60).padStart(2, "0");
    return `UTC${sign}${hours}:${minutes}`;
  }

  const { limit, currentData } = useSelector((state) => state?.mqtt);
  const { currentDevice } = useSelector((state) => state?.devices);
  const dispatch = useDispatch();

  const [triggerGetProtocols, { isLoading, isFetching }] =
    useLazyGetAllProtocolsQuery();

  const [timeWindowTab, setTimeWindowTab] = React.useState(0);
  const [realtimeConfig, setRealtimeConfig] = React.useState({
    interval: 5,
    limit: 5,
  });

  const [historyConfig, setHistoryConfig] = React.useState({
    range_value: 5,
    range_unit: "minutes",
    fromDate: new Date(),
    toDate: new Date(),
    timezone: getCurrentTimezoneOffset(),
    limit: 5,
  });

  const { emitEvent } = useSocket();

  const handleTabChange = (_, newValue) => {
    if (currentDevice !== false) {
      dispatch(addCurrentData(newValue));
    }
  };
  const handleTabChangeOfTimeWindow = (_, newValue) =>
    setTimeWindowTab(newValue);

  const updateRealtimeConfig = (field, value) => {
    setRealtimeConfig((prev) => ({ ...prev, [field]: value }));
  };

  const updateHistoryConfig = (field, value) => {
    setHistoryConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setRealtimeConfig(realtimeConfig);
    // setHistoryConfig({
    //   ...historyConfig,
    //   fromDate: new Date(),
    //   toDate: new Date(),
    // });
    setTimeWindowTab(0);
    setAnchorEl(null);
  };

  const handleUpdate = async () => {
    if (currentData === 1) {
      let payload = {
        device_uuid: id,
        limit: historyConfig.limit || 10,
        timezone: historyConfig.timezone,
      };
      dispatch(addMqttDataState(currentData));
      dispatch(
        addMqttMessage(
          `History - ${
            timeWindowTab === 0
              ? `last ${historyConfig.range_value} ${historyConfig.range_unit}`
              : `range ${dayjs(historyConfig.fromDate).format(
                  "DD-MM-YYYY HH:mm"
                )} - ${dayjs(historyConfig.toDate).format("DD-MM-YYYY HH:mm")}`
          }`
        )
      );
      if (timeWindowTab === 0) {
        payload = {
          ...payload,
          range_value: historyConfig.range_value,
          range_unit: historyConfig.range_unit,
        };
      } else if (timeWindowTab === 1) {
        payload = {
          ...payload,
          startTime: dayjs(historyConfig.fromDate).format(
            "YYYY-MM-DDTHH:mm:ss"
          ),
          endTime: dayjs(historyConfig.toDate).format("YYYY-MM-DDTHH:mm:ss"),
        };
      }

      try {
        const res = await triggerGetProtocols(payload).unwrap();
        toast.success("History configuration updated");
        const transformed = (res.protocolsByRank || [])
          .filter((item) => item) // remove null/undefined entries
          .map((item) => {
            const dateObj = new Date(item.timestamp);
            return {
              timestamp: item.timestamp,
              date: dateObj.toISOString().split("T")[0],
              time: dateObj.toISOString().split("T")[1].replace("Z", ""),
              device_ID: item.ofp_uid,
              ...item.data,
            };
          });
        dispatch(addMqttHistoryData(transformed));

        handleClose();
      } catch (err) {
        toast.error(err?.data?.message || "Failed to fetch protocols");
        console.error("API Error:", err);
      }
    } else {
      if (currentDevice !== false) {
        emitEvent("mqtt_protocol", {
          thing_name: id,
          interval_time: realtimeConfig?.interval * 1000,
          data_range: realtimeConfig?.limit,
        });
        dispatch(addMqttProtocol(realtimeConfig?.limit));
        dispatch(addMqttDataState(currentData));
        dispatch(
          addMqttMessage(
            `Realtime - ${
              realtimeConfig?.interval < 60
                ? `${realtimeConfig?.interval} sec`
                : `${Math.floor(realtimeConfig?.interval / 60)} min ${
                    realtimeConfig?.interval % 60
                      ? (realtimeConfig?.interval % 60) + " sec"
                      : ""
                  }`
            }`
          )
        );
        toast.success("Realtime configuration updated");
      }
      handleClose();
    }
  };

  React.useEffect(() => {
    setRealtimeConfig((prev) => ({
      ...prev,
      limit,
    }));
  }, [limit]);

  React.useEffect(() => {
    if (currentDevice === false) {
      dispatch(addMqttDataState(1));
      dispatch(addCurrentData(1));
      dispatch(
        addMqttMessage(
          `History - ${
            timeWindowTab === 0
              ? `last ${historyConfig.range_value} ${historyConfig.range_unit}`
              : `range ${dayjs(historyConfig.fromDate).format(
                  "DD-MM-YYYY HH:mm"
                )} - ${dayjs(historyConfig.toDate).format("DD-MM-YYYY HH:mm")}`
          }`
        )
      );
      const fetchProtocols = async () => {
        setHistoryConfig((prev) => ({
          ...prev,
          range_value: 5,
          range_unit: "minutes",
          timezone: getCurrentTimezoneOffset(),
          limit: 100,
        }));

        const payload = {
          range_value: 5,
          range_unit: "minutes",
          timezone: getCurrentTimezoneOffset(),
          limit: 100,
          device_uuid: id,
        };

        try {
          const res = await triggerGetProtocols(payload).unwrap();
          // toast.success("History configuration updated");

          const transformed = (res.protocolsByRank || [])
            .filter((item) => item) // remove null/undefined entries
            .map((item) => {
              const dateObj = new Date(item.timestamp);
              return {
                timestamp: item.timestamp,
                date: dateObj.toISOString().split("T")[0],
                time: dateObj.toISOString().split("T")[1].replace("Z", ""),
                device_ID: item.ofp_uid,
                ...item.data,
              };
            });

          dispatch(addMqttHistoryData(transformed));
          handleClose();
        } catch (err) {
          toast.error(err?.data?.message || "Failed to fetch protocols");
          console.error("API Error:", err);
        }
      };

      fetchProtocols();
    }
  }, [currentDevice]);

  React.useEffect(() => {
    if (isLoading || isFetching) {
      dispatch(handleMqttLoading(true));
    } else {
      dispatch(handleMqttLoading(false));
    }
  }, [isLoading, isFetching]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        sx: {
          mt: 0.5,
          width: { xs: "95vw", sm: 480 },
          borderRadius: 2,
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {/* Tabs Header */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", p: 1.5 }}>
        <Tabs
          value={currentData}
          onChange={handleTabChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={METER_READING_MODAL_STYLE.tabsContainer}
        >
          <Tab label="Realtime" />
          <Tab label="History" />
        </Tabs>
      </Box>

      {/* Content */}
      <Box sx={{ p: 2, minHeight: 200 }}>
        {currentData === 0 && (
          <RealtimeConfig
            realtimeConfig={realtimeConfig}
            updateRealtimeConfig={updateRealtimeConfig}
          />
        )}
        {currentData === 1 && (
          <HistoryConfig
            historyConfig={historyConfig}
            updateHistoryConfig={updateHistoryConfig}
            timeWindowTab={timeWindowTab}
            handleTabChangeOfTimeWindow={handleTabChangeOfTimeWindow}
          />
        )}
      </Box>

      {/* Footer */}
      <Divider />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleUpdate}
          disabled={isLoading || isFetching}
        >
          {isLoading && isFetching ? "Loading..." : "Update"}
        </Button>
      </Box>
    </Popover>
  );
};

export default MeterReadingConfigPopover;
