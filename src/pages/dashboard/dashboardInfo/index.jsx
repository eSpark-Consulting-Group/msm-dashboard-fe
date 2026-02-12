import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import DashboardWrapper from "../../../components/card";
import InfoCard from "../../../components/info-card";
import DynamicTabs from "../../../components/tabs";
import {
  deviceConfiguration,
  infoData,
  mqttProtocol,
  mqttsProtocol,
  networkProtocol,
  otaData,
  sftp,
} from "../../../constant";
import {
  useGetAssignDeviceByIdQuery,
  useGetDeviceByIdQuery,
  useRebootDeviceMutation,
} from "../../../services/devices";
import { useGetNtpDevicesByIdQuery } from "../../../services/ntp";
import { useGetSftpDevicesByIdQuery } from "../../../services/sftp";
import {
  useGetMqttByDeviceIdQuery,
  useGetMqttsByDeviceIdQuery,
} from "../../../services/mqtt";
import {
  addDeviceStatus,
  handleSelectedDevice,
} from "../../../store/slices/devices";
import { addCurrentData, addMqttDataState } from "../../../store/slices/mqtt";
import { useGetCurrentOtaQuery } from "../../../services/ota";
import { resetTabs } from "../../../store/slices/info";
import { useGetConfigurationDevicesByIdQuery } from "../../../services/configration";
// import { useSocket } from "../../../SocketTest";

const DashboardInfo = () => {
  const { id } = useParams();
  const [assignDeviceData, setAssignDeviceData] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const {
    info: socketInfo,
    ntp: socketNtp,
    mqtt: socketMqtt,
    sftp: socketSftp,
    mqtts: socketMqtts,
    ota: socketOta,
  } = useSelector((state) => state.info);

  // const {
  //   requestDeviceInfo,
  //   requestNtpInfo,
  //   requestMqttInfo,
  //   requestSftpInfo,
  // } = useSocket();

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
    data: ntpData,
    isLoading: ntpLoading,
    isError: isNtpError,
    error: ntpError,
    refetch,
    isFetching: ntpFetching,
  } = useGetNtpDevicesByIdQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: mqttData,
    isLoading: mqttLoading,
    isError: isMqttError,
    error: mqttError,
    refetch: mqttRefetch,
    isFetching: mqttFetching,
  } = useGetMqttByDeviceIdQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: mqttsData,
    isLoading: mqttsLoading,
    isError: isMqttsError,
    error: mqttsError,
  } = useGetMqttsByDeviceIdQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: otaDeviceData,
    isLoading: otaLoading,
    isError: isOtaError,
    error: otaError,
    refetch: otaRefetch,
    isFetching: otaFetching,
  } = useGetCurrentOtaQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: sftpData,
    isLoading: sftpLoading,
    isError: isSftpError,
    error: sftpError,
    refetch: sftpRefetch,
    isFetching: sftpFetching,
  } = useGetSftpDevicesByIdQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: configurationData,
    isLoading: configurationLoading,
    isError: isConfigurationError,
    error: configurationError,
    refetch: configurationRefetch,
    isFetching: configurationFetching,
  } = useGetConfigurationDevicesByIdQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const [reboot] = useRebootDeviceMutation();

  useEffect(() => {
    if (isDeviceError)
      toast.error(deviceError?.data?.message, { toastId: "DEVICEERROR" });
    if (isDeviceError2 && deviceError2)
      toast.error(deviceError2?.data?.message, { toastId: "DEVICE2ERROR" });
    if (isNtpError)
      toast.error(ntpError?.data?.message, { toastId: "NTPERROR" });
    if (isMqttError)
      toast.error(mqttError?.data?.message, { toastId: "MQTTERROR" });
    if (isMqttsError)
      toast.error(mqttsError?.data?.message, { toastId: "MQTTSERROR" });
    if (isOtaError)
      toast.error(otaError?.data?.message, { toastId: "OTAERROR" });
    if (isSftpError)
      toast.error(sftpError?.data?.message, { toastId: "SFTPERROR" });
    if (isConfigurationError)
      toast.error(configurationError?.data?.message, {
        toastId: "CONFIGURATION",
      });
  }, [
    isDeviceError,
    deviceError,
    isNtpError,
    ntpError,
    isMqttError,
    mqttError,
    isMqttsError,
    mqttsError,
    isOtaError,
    otaError,
    isSftpError,
    sftpError,
    isConfigurationError,
    configurationError,
    isDeviceError2,
    deviceError2,
  ]);

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
      setAssignDeviceData(myData);
      dispatch(addDeviceStatus(data?.device_data?.device_data?.device_status));
      dispatch(
        addCurrentData(
          data?.device_data?.device_data?.device_status === false ? 1 : 0,
        ),
      );
      dispatch(
        addMqttDataState(
          data?.device_data?.device_data?.device_status === false ? 1 : 0,
        ),
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
          deviceData?.data?.device_data?.device_status === false ? 1 : 0,
        ),
      );
      dispatch(
        addMqttDataState(
          deviceData?.data?.device_data?.device_status === false ? 1 : 0,
        ),
      );

      // requestDeviceInfo(id);
    }
  }, [deviceData]);

  useEffect(() => {
    if (ntpData?.data) {
      // requestNtpInfo(id);
    }
  }, [ntpData]);

  useEffect(() => {
    if (mqttData?.data) {
      // requestMqttInfo(id);
    }
  }, [mqttData]);

  useEffect(() => {
    if (sftpData?.data) {
      // requestSftpInfo(id);
    }
  }, [sftpData]);

  useEffect(() => {
    if (mqttsData) {
    }
  }, [mqttsData]);

  useEffect(() => {
    dispatch(resetTabs());
  }, [id]);

  const handleReboot = async () => {
    try {
      const res = await reboot(id);
      if (res?.data) {
        toast.success(res?.data?.message);
      }
      if (res?.error) {
        toast.error("Reboot Error");
        console.log(res?.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tabs = [
    {
      label: "INFO",
      component: (
        <InfoCard
          info={infoData({
            ...(user?.role?.name === "user"
              ? assignDeviceData
              : deviceData?.data?.device_data),
            ...socketInfo,
          })}
          title="Device Info"
          buttonLabel="Reboot"
          onButtonClick={handleReboot}
          role={user?.role?.name}
          type={"INFO"}
          id={deviceData?.data?.device_data?.device_uuid}
        />
      ),
    },
    {
      label: "NTP",
      component: (
        <InfoCard
          info={networkProtocol({
            ...ntpData?.data,
            data: { ...ntpData?.data?.data, ...socketNtp },
          })}
          title="Network Time Protocol"
          onButtonClick={() => refetch()}
          date={dayjs(ntpData?.data?.createdAt).format("DD-MM-YYYY")}
          time={dayjs(ntpData?.data?.createdAt).format("hh:mm")}
          role={user?.role?.name}
          id={id}
          buttonLoading={ntpFetching}
          type={"NTP"}
        />
      ),
    },
    {
      label: "MQTT",
      component: (
        <InfoCard
          info={mqttProtocol([
            {
              ...(mqttData?.data?.[0] || {}),
              ...socketMqtt,
            },
          ])}
          title="MQTT Protocol"
          onButtonClick={() => mqttRefetch()}
          role={user?.role?.name}
          buttonLoading={mqttFetching}
          type={"MQTT"}
          id={id}
        />
      ),
    },
    {
      label: "SFTP",
      component: (
        <InfoCard
          info={sftp({
            ...sftpData?.data,
            ...socketSftp,
          })}
          title="SFTP"
          onButtonClick={() => sftpRefetch()}
          role={user?.role?.name}
          buttonLoading={sftpFetching}
          type={"SFTP"}
          id={sftpData?.data?._id}
        />
      ),
    },
    {
      label: "MQTTs",
      component: (
        <InfoCard
          info={mqttsProtocol({
            ...mqttsData?.data,
            ...socketMqtts,
          })}
          title="MQTTs Protocol"
          role={user?.role?.name}
          type={"MQTTS"}
          id={mqttsData?.data?.device_uuid}
        />
      ),
    },
    {
      label: "OTA",
      component: (
        <InfoCard
          info={otaData({
            ...otaDeviceData?.data,
            ...socketOta,
          })}
          title="OTA"
          buttonLabel="Check updates"
          onButtonClick={otaRefetch}
          role={user?.role?.name}
          buttonLoading={otaFetching}
          type={"OTA"}
          id={otaDeviceData?.data?.device_uuid}
        />
      ),
    },
    {
      label: "CONFIGURATION",
      component: (
        <InfoCard
          info={deviceConfiguration(configurationData)}
          title="Device Configuration"
          onButtonClick={() => configurationRefetch()}
          role={user?.role?.name}
          buttonLoading={configurationFetching}
          type={"CONFIGURATION"}
          id={configurationData?.data?.device_uuid}
        />
      ),
    },
  ];

  return (
    <DashboardWrapper
      loading={
        deviceLoading ||
        ntpLoading ||
        mqttLoading ||
        mqttsLoading ||
        otaLoading ||
        sftpLoading ||
        configurationLoading ||
        deviceLoading2
      }
    >
      <DynamicTabs tabs={tabs} width="100%" maxWidth="100%" />
    </DashboardWrapper>
  );
};

export default DashboardInfo;
