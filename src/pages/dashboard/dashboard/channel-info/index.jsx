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
import { useGetTelemetryByDeviceAndChannelQuery } from "../../../../services/telemetry";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { mapEnergyData, mapGeneralData, mapPowerData } from "../../../../utils";

dayjs.extend(relativeTime);

const ChannelInfo = () => {
  const [generalData, setGeneralData] = useState([]);
  const [powerData, setPowerData] = useState([]);
  const [energyData, setEnergyData] = useState([]);

  const tabs = [
    { label: "General", component: <General data={generalData} /> },
    { label: "Power", component: <Power data={powerData} /> },
    { label: "Energy", component: <Energy data={energyData} /> },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname.split("/");
  const channelName = path[path.length - 1];
  const channelId = channelName?.split("-");
  const dynamicId = path[2];
  const [totalCHannel, setTotalCHannel] = useState(null);

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
    { skip: !dynamicId || !channelId[1] }
  );

  const handleBack = () => {
    navigate(`/dashboard/${dynamicId}/home`);
  };

  const handlePageForward = () => {
    const number = channelName.split("-");
    const newNumber = Number(number[1]);
    if (newNumber + 1 <= totalCHannel) {
      navigate(
        `/dashboard/${dynamicId}/info/channel-${newNumber + 1 > 9 ? "" : "0"}${
          newNumber + 1
        }${location?.search}`
      );
    }
  };

  const handlePageBack = () => {
    const number = channelName.split("-");
    const newNumber = Number(number[1]);
    if (newNumber - 1 > 0) {
      navigate(
        `/dashboard/${dynamicId}/info/channel-${newNumber - 1 > 9 ? "" : "0"}${
          newNumber - 1
        }${location?.search}`
      );
    }
  };

  useEffect(() => {
    if (telemetryData) {
      let data = telemetryData?.data || [];
      setTotalCHannel(data?.length);
      setGeneralData(mapGeneralData(data));
      setPowerData(mapPowerData(data));
      setEnergyData(mapEnergyData(data));
    }
  }, [telemetryData]);

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
        {telemetryLoading || telemetryFetching ? (
          <LinearProgress />
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <DynamicTabs tabs={tabs} />
            <ChannelPagination
              channelName={channelName}
              handlePageBack={handlePageBack}
              handlePageForward={handlePageForward}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ChannelInfo;
