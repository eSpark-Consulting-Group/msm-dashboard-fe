import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import {
  ChannelPagination,
  DynamicTabs,
  NavigateHeader,
} from "../../../../components";
import { backIcon, energy, flashBlack } from "../../../../assets";
import General from "./general";
import Power from "./power";
import Energy from "./energy";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useGetTelemetryByDeviceAndChannelQuery,
  useGetTelemetryByDeviceQuery,
} from "../../../../services/telemetry";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  mapEnergyData,
  mapEnergyRTData,
  mapGeneralData,
  mapGeneralRTData,
  mapPowerData,
  mapPowerRTData,
} from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { handleTotalChannels } from "../../../../store/slices/telemetry";
import {
  addDeviceStatus,
  handleSelectedDevice,
} from "../../../../store/slices/devices";
import {
  addCurrentData,
  addMqttDataState,
} from "../../../../store/slices/mqtt";
import {
  useGetAssignDeviceByIdQuery,
  useGetDeviceByIdQuery,
} from "../../../../services/devices";
import { useSearchParams } from "react-router-dom";
import { useSocket } from "../../../../SocketTest";

dayjs.extend(relativeTime);

const ChannelInfo = () => {
  const [generalData, setGeneralData] = useState([]);
  const [powerData, setPowerData] = useState([]);
  const [energyData, setEnergyData] = useState([]);
  const [temperature, setTemperature] = useState("");
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [powerRealTime, setPowerRealTime] = useState([]);
  const [energrealTime, setEnergyRealTime] = useState([]);

  const { isSocketHasGeneral, temperatureValue } = useSelector(
    (state) => state?.telemetry
  );

  const tabs = [
    {
      label: "General",
      component: <General data={generalData} temperature={temperature} />,
    },
    {
      label: "Power",
      component: <Power data={powerData} newData={powerRealTime} />,
    },
    {
      label: "Energy",
      component: <Energy data={energyData} newData={energrealTime} />,
    },
  ];

  const { totalChannels } = useSelector((state) => state.telemetry);
  const { user } = useSelector((state) => state?.auth);
  const { selectedDevice } = useSelector((state) => state?.devices);
  const { subscribeToTelemetry, unsubscribeFromTelemetry } = useSocket();

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/");
  const channelName = path[path.length - 1];
  const channelId = channelName?.split("-");
  const dynamicId = path[2];

  const channelNum = Number(channelId[1]);

  useEffect(() => {
    if (!dynamicId || !channelNum) return;
    subscribeToTelemetry(dynamicId, channelNum);
    return () => {
      unsubscribeFromTelemetry(dynamicId, channelNum);
    };
  }, [dynamicId, channelNum, subscribeToTelemetry, unsubscribeFromTelemetry]);

  const {
    data: deviceData,
    isLoading: deviceLoading,
    isError: isDeviceError,
  } = useGetDeviceByIdQuery(dynamicId, {
    skip: !dynamicId || user?.role?.name === "user",
    refetchOnMountOrArgChange: true,
  });

  const {
    data: deviceData2,
    isLoading: deviceLoading2,
    isError: isDeviceError2,
  } = useGetAssignDeviceByIdQuery(dynamicId, {
    skip: !dynamicId || user?.role?.name !== "user",
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useDispatch();

  const {
    data: telemetryData,
    isLoading: telemetryLoading,
    isError: isTelemetryError,
    error: telemetryError,
    isFetching: telemetryFetching,
  } = useGetTelemetryByDeviceAndChannelQuery(
    {
      device_uuid: dynamicId,
      channel_id: channelId[1],
    },
    {
      skip: !dynamicId || !channelId[1],
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    }
  );

  const {
    data: telemetryData2,
    isLoading: telemetryLoading2,
    isError: isTelemetryError2,
    error: telemetryError2,
    isSuccess,
  } = useGetTelemetryByDeviceQuery(
    {
      device_uuid: dynamicId,
      page: 1,
      limit: 12,
    },
    { skip: totalChannels !== 0 }
  );

  const handleBack = () => {
    navigate(`/dashboard/${dynamicId}/home`);
  };

  const handlePageForward = () => {
    const number = channelName.split("-")[1];
    let newNumber = Number(number) + 1;

    if (newNumber > 12) newNumber = 1;

    navigate(
      `/dashboard/${dynamicId}/home/channel-${
        newNumber < 10 ? "0" : ""
      }${newNumber}${location?.search}`
    );
  };

  const handlePageBack = () => {
    const number = channelName.split("-")[1];
    let newNumber = Number(number) - 1;

    if (newNumber < 1) newNumber = 12; // wrap to 12

    navigate(
      `/dashboard/${dynamicId}/home/channel-${
        newNumber < 10 ? "0" : ""
      }${newNumber}${location?.search}`
    );
  };

  useEffect(() => {
    if (telemetryData) {
      let data = telemetryData?.data || [];
      // setTotalCHannel(data?.length);
      // setGeneralData(mapGeneralData(data?.slice(0, 3)));
      setPowerData(mapPowerData(data?.slice(0, 3)));
      setEnergyData(mapEnergyData(data?.slice(0, 3)));
      setGeneralData(mapGeneralRTData(data[3]?.latestPhases));
      setPowerRealTime(mapPowerRTData(data[3]?.latestPhases));
      setEnergyRealTime(mapEnergyRTData(data[3]?.latestPhases));
      setTemperature(data[3]?.latestPhases[0]?.temperature);
    }
  }, [telemetryData]);

  useEffect(() => {
    if (isSocketHasGeneral) {
      setTemperature(temperatureValue);
    }
  }, [isSocketHasGeneral, temperatureValue]);

  useEffect(() => {
    if (telemetryData2) {
      const myMap = {};
      const unique = [];

      for (const item of telemetryData2?.data) {
        if (!myMap[item.channel_id]) {
          myMap[item.channel_id] = true;
          unique.push(item);
        }
      }

      dispatch(handleTotalChannels(unique?.length));
    }
  }, [telemetryData2]);

  useEffect(() => {
    if (!user) return;
    if (user?.role?.name === "user") {
      if (
        selectedDevice &&
        selectedDevice?.device_data?.device_data?.device_status === false
      ) {
        navigate(`/dashboard/${dynamicId}/info`);
      }
    } else {
      if (
        selectedDevice &&
        selectedDevice?.device_data?.device_status === false
      ) {
        navigate(`/dashboard/${dynamicId}/info`);
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

  useEffect(() => {
    if (isTelemetryError && telemetryError) {
      console.log(telemetryError);
    }
  }, [isTelemetryError, telemetryError]);

  if (isTelemetryError && telemetryError) {
    return (
      <>
        <Typography>{telemetryError?.data?.message}</Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ChannelPagination
            channelName={channelName}
            handlePageBack={handlePageBack}
            handlePageForward={handlePageForward}
          />
        </Box>
      </>
    );
  }

  // if (telemetryLoading || telemetryFetching) {
  //   return (
  //     <Box>
  //       <LinearProgress />
  //     </Box>
  //   );
  // }

  return (
    <Box>
      <NavigateHeader />
      <Box
        sx={{
          p: "9px 16.69px 9.11px 16px",
          borderRadius: "10.05px",
          background: "linear-gradient(180deg, #0077FF 0%, #004799 100%)",
          border: "0.84px solid #0C89E2",
          display: "flex",
          width: "fit-content",
          m: "30px 0px 10px 30px",
          cursor: "pointer",
        }}
        onClick={handleBack}
      >
        <img src={backIcon} alt="Icon" />
        <Typography sx={{ fontSize: "17px", color: "#FFFFFF" }}>
          Back
        </Typography>
      </Box>
      <Paper sx={{ padding: { xs: "10px 0px", lg: "30px" } }}>
        {telemetryLoading && !isSocketHasGeneral ? (
          <LinearProgress />
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <DynamicTabs tabs={tabs} temperature={true} />
            <ChannelPagination
              channelName={channelName}
              handlePageBack={handlePageBack}
              handlePageForward={handlePageForward}
            />

            {
              <Box
                sx={{
                  position: "absolute",
                  right: 10,
                  top: 15,
                  transform: "translateY(-50%)",
                  display: { xs: "none", lg: "block" },
                }}
              >
                <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
                  Temperature: {Number(temperature).toFixed(2)} °C
                </Typography>
              </Box>
            }
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ChannelInfo;
