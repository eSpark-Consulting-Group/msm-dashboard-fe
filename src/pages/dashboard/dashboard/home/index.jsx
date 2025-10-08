import {
  Box,
  CircularProgress,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { info } from "../../../../assets";
import { homeFlashCards } from "../../../../constant";
import { NavigateHeader, Channels, DynamicTabs2 } from "../../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetTelemetryByDeviceQuery } from "../../../../services/telemetry";
import MeterReadingConfigPopover from "../../../../components/meter-reading-modal";
import { useDispatch, useSelector } from "react-redux";
import { handleTotalChannels } from "../../../../store/slices/telemetry";
import {
  useGetAssignDeviceByIdQuery,
  useGetDeviceByIdQuery,
} from "../../../../services/devices";
import {
  addDeviceStatus,
  handleSelectedDevice,
} from "../../../../store/slices/devices";
import {
  addCurrentData,
  addMqttDataState,
} from "../../../../store/slices/mqtt";

const DashboardHome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [channelsData, setChannelsData] = useState([]);
  const { user } = useSelector((state) => state?.auth);
  const { selectedDevice } = useSelector((state) => state?.devices);

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

  const {
    data: telemetryData,
    isLoading: telemetryLoading,
    isError: isTelemetryError,
    error: telemetryError,
    isSuccess,
  } = useGetTelemetryByDeviceQuery({
    device_uuid: id,
    page: 1,
    limit: 12,
  });

  const handleNavigate = (channelId) => {
    navigate(`/dashboard/${id}/info/channel-${channelId}`);
  };

  const handleInfo = () => {
    navigate(`/dashboard/${id}/info`);
  };

  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (newIndex) => {
    setActiveTab(newIndex);
    if (newIndex == 0) {
      navigate(`/dashboard/${id}`, { state: { myVar: "home" } });
    } else {
      navigate(`/dashboard/${id}/home`);
    }
  };

  useEffect(() => {
    if (telemetryData) {
      const myMap = {};
      const unique = [];

      for (const item of telemetryData?.data) {
        if (!myMap[item.channel_id]) {
          myMap[item.channel_id] = true;
          unique.push(item);
        }
      }

      const data = unique?.map((item) => ({
        id: item?.channel_id,
        variant: item?.channel_status ? "connected" : "disable",
        name: `Channel ${
          item?.channel_id > 9 ? item?.channel_id : `0${item?.channel_id}`
        }`,
      }));
      dispatch(handleTotalChannels(data?.length));
      setChannelsData(data);
    }
  }, [telemetryData]);

  useEffect(() => {
    if (!user) return;
    if (user?.role?.name === "user") {
      if (
        selectedDevice &&
        selectedDevice?.device_data?.device_data?.device_status === false
      ) {
        navigate(`/dashboard/${id}/info`);
      }
    } else {
      if (
        selectedDevice &&
        selectedDevice?.device_data?.device_status === false
      ) {
        navigate(`/dashboard/${id}/info`);
      }
    }
  }, [user, selectedDevice]);

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
      dispatch(handleSelectedDevice(data));

      // requestDeviceInfo(id);
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

      // requestDeviceInfo(id);
    }
  }, [deviceData]);

  // if (telemetryLoading) {
  //   return (
  //     <Stack justifyContent="center" alignItems="center">
  //       <CircularProgress />
  //     </Stack>
  //   );
  // }

  return (
    <Box>
      <NavigateHeader />
      <DynamicTabs2
        tabs={[
          { id: 1, label: "Dashboard 1", content: <></> },
          { id: 2, label: "Dashboard 2", content: <></> },
        ]}
        linksTab={true}
        defaultActive={activeTab}
        onTabChange={handleTabChange}
      />

      {telemetryLoading ? (
        <LinearProgress />
      ) : telemetryData?.data?.length === 0 ? (
        <>
          <Typography sx={{ fontSize: "25.19px", fontWeight: "700" }}>
            No Channels Found
          </Typography>
        </>
      ) : (
        <>
          {/* Info Button */}
          <Box
            sx={{
              background: "linear-gradient(180deg, #0095FF 0%, #0886E0 100%)",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              p: "6px 20px",
              display: "flex",
              columnGap: "10px",
              width: "fit-content",
              ml: "30px",
              border: "1px solid #0077FF",
              mt: "30px",
              cursor: "pointer",
            }}
            onClick={handleInfo}
          >
            <img src={info} alt="Icon" />
            <Typography
              sx={{ fontSize: "21px", fontWeight: "500", color: "#ffffff" }}
            >
              Info
            </Typography>
          </Box>

          {/* Channels */}
          <Paper sx={{ padding: "30px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                rowGap: "35px",
                columnGap: "40px",
              }}
            >
              {channelsData?.map((item) => (
                <Channels
                  key={item?.id}
                  variant={item?.variant}
                  name={item?.name}
                  onClick={() => handleNavigate(item?.id)}
                />
              ))}
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default DashboardHome;
