import { useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import DashboardWrapper from "../../../components/card";
import InfoCard from "../../../components/info-card";
import DynamicTabs from "../../../components/tabs";
import {
  infoData,
  mqttProtocol,
  networkProtocol,
  sftp,
} from "../../../constant";
import { useGetDeviceByIdQuery } from "../../../services/devices";
import { useGetNtpDevicesByIdQuery } from "../../../services/ntp";
import { useGetSftpDevicesByIdQuery } from "../../../services/sftp";
import { useGetMqttByDeviceIdQuery } from "../../../services/mqtt";

const DashboardInfo = () => {
  const { id } = useParams();

  const { user } = useSelector(state => state.auth);
  const { data: deviceData, isLoading: deviceLoading, isError: isDeviceError, error: deviceError } = useGetDeviceByIdQuery(id, { skip: !id });
  const { data: ntpData, isLoading: ntpLoading, isError: isNtpError, error: ntpError } = useGetNtpDevicesByIdQuery(id, { skip: !id });
  const { data: mqttData, isLoading: mqttLoading, isError: isMqttError, error: mqttError } = useGetMqttByDeviceIdQuery(id, { skip: !id });
  const { data: sftpData, isLoading: sftpLoading, isError: isSftpError, error: sftpError } = useGetSftpDevicesByIdQuery(id, { skip: !id });

  useEffect(() => {
    if (isDeviceError) {
      toast.error(deviceError?.data?.message);
    }
    if (isNtpError) {
      toast.error(ntpError?.data?.message);
    }
    if (isMqttError) {
      toast.error(mqttError?.data?.message);
    }
    if (isSftpError) {
      toast.error(sftpError?.data?.message);
    }
  }, [isDeviceError, deviceError, isNtpError, ntpError, isMqttError, mqttError, isSftpError, sftpError])

  const tabs = [
    {
      label: "INFO",
      component: (
        <InfoCard
          info={infoData(deviceData?.data?.device_data)}
          title="Device Info"
          buttonLabel="Reboot"
          onButtonClick={() => console.log("Button clicked")}
          role={user?.role?.name}
        />
      ),
    },
    {
      label: "NTP",
      component: (
        <InfoCard
          info={networkProtocol(ntpData?.data)}
          title="Network Time Protocol"
          buttonLabel="Refresh"
          onButtonClick={() => console.log("Button clicked")}
          date={dayjs(ntpData?.data?.createdAt).format("YYYY-MM-DD")}
          time={dayjs(ntpData?.data?.createdAt).format("hh:mm A")}
          role={user?.role?.name}
        />
      ),
    },
    {
      label: "MQTTS",
      component: (
        <InfoCard
          info={mqttProtocol(mqttData?.data)}
          title="MQTTS Protocol"
          buttonLabel="Refresh"
          onButtonClick={() => console.log("Button clicked")}
          role={user?.role?.name}
        />
      ),
    },
    {
      label: "SFTP",
      component: (
        <InfoCard
          info={sftp(sftpData?.data)}
          title="SFTP"
          buttonLabel="Refresh"
          onButtonClick={() => console.log("Button clicked")}
          role={user?.role?.name}
        />
      ),
    },
  ];

  return (
    <DashboardWrapper loading={deviceLoading || ntpLoading || mqttLoading || sftpLoading}>
      <DynamicTabs tabs={tabs} />
    </DashboardWrapper>
  );
};

export default DashboardInfo;
