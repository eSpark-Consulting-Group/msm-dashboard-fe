import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import {
  DynamicTabs,
  PhaseCards,
  DynamicTabs2,
  NavigateHeader,
} from "../../../../components";
import { useGetMeasurementsQuery } from "../../../../services/measurements";
import { flashBlack, home, info } from "../../../../assets";
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

const Measurement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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

  const handleTabChange = (newIndex) => {
    setActiveTab(newIndex);
    if (newIndex == 0) {
      navigate(`/dashboard/${id}`, { state: { myVar: "home" } });
    } else {
      navigate(`/dashboard/${id}/home`);
    }
  };

  const handleInfo = () => {
    navigate(`/dashboard/${id}/info`);
  };

  const handleHome = () => {
    navigate(`/dashboard/${id}/home`);
  };

  useEffect(() => {
    if (deviceData2) {
      const data = deviceData2?.data;
      const myData = {
        device_uuid: data?.device_data?.device_data?.device_uuid,
        device_imei: data?.device_data?.device_data?.device_imei,
        device_ip: data?.device_data?.device_data?.device_ip,
        mqtt_status: data?.device_data?.device_data?.mqtt_status,
        sftp_status: data?.device_data?.device_data?.sftp_status,
      };
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

  const { measurements } = useSelector((state) => state.measurements);
  const [ctRatios, setCtRatios] = useState({});
  const [iOffset, setIOfset] = useState({});
  const [vOffset, setVOfset] = useState({});

  const { isLoading, isError, error } = useGetMeasurementsQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Failed to fetch measurements");
      setCtRatios({});
      setIOfset({});
      setVOfset({});
      return;
    }
    setCtRatios(measurements?.ct_ratio || {});
    setIOfset(measurements?.i_offset || {});
    setVOfset(measurements?.v_offset || {});
  }, [id, isError, error, measurements]);

  const ChannelsParentComp = ({ obj, unit }) => {
    return (
      <Grid container spacing={2}>
        {Object.entries(obj)?.length > 0 ? (
          Object.entries(obj)?.map(([key, value], ind) => {
            const formattedKey =
              "Channel " + key.split("-")[1].padStart(2, "0");
            return (
              <PhaseCards
                color={"red"}
                heading={formattedKey}
                icon={flashBlack}
                value={`${value}.00 ${unit}`}
                valueColor={"green"}
                headingSize={"18.05px"}
                key={ind}
                phase={"A"}
              />
            );
          })
        ) : (
          <Typography width="100%" textAlign="center" fontSize="22px">
            No Data Available
          </Typography>
        )}
      </Grid>
    );
  };

  const tabs = [
    {
      label: "CT Ratios",
      component: <ChannelsParentComp obj={ctRatios} unit="%" />,
    },
    {
      label: "V-OFFSET",
      component: <ChannelsParentComp obj={vOffset} unit="V" />,
    },
    {
      label: "I-OFFSET",
      component: <ChannelsParentComp obj={iOffset} unit="mA" />,
    },
  ];

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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Paper sx={{ padding: "30px", position: "relative", my: 8 }}>
          <Box
            sx={{
              position: "absolute",
              top: -45,
              left: 100,
              width: 136,
              height: 45,
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to right, #0095FF, #0886E0)",
                gap: "8px",
                border: "1px solid #0077FF",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }}
              onClick={handleInfo}
            >
              <img
                src={info}
                alt="Home"
                width={18}
                height={18}
                style={{ display: "inline-block" }}
              />
              Info
            </Button>
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: -45,
              right: 100,
              width: 136,
              height: 45,
            }}
          >
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(to right, #0095FF, #0886E0)",
                gap: "8px",
                border: "1px solid #0077FF",
                borderTopLeftRadius: "12px",
                borderTopRightRadius: "12px",
                borderBottomLeftRadius: "0",
                borderBottomRightRadius: "0",
              }}
              onClick={handleHome}
            >
              <img
                src={home}
                alt="Home"
                width={18}
                height={18}
                style={{ display: "inline-block" }}
              />
              Home
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              rowGap: "35px",
              columnGap: "40px",
            }}
          >
            {isLoading ? (
              <LinearProgress sx={{ width: "100%" }} />
            ) : (
              <DynamicTabs tabs={tabs} width="fit-content" maxWidth={650} />
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Measurement;
