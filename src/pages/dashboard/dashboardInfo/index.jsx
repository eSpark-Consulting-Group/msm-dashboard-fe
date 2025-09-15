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

const DashboardInfo = () => {
  const { user } = useSelector(state => state.auth); 
  const tabs = [
    {
      label: "INFO",
      component: (
        <InfoCard
          info={infoData}
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
          info={networkProtocol}
          title="Network Time Protocol"
          buttonLabel="Refresh"
          onButtonClick={() => console.log("Button clicked")}
          date="2025-07-09"
          time="14:45 PM"
          role={user?.role?.name}
        />
      ),
    },
    {
      label: "MQTT",
      component: (
        <InfoCard
          info={mqttProtocol}
          title="MQTT Protocol"
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
          info={sftp}
          title="SFTP"
          buttonLabel="Refresh"
          onButtonClick={() => console.log("Button clicked")}
          role={user?.role?.name}
        />
      ),
    },
  ];

  return (
    <DashboardWrapper>
      <DynamicTabs tabs={tabs} />
    </DashboardWrapper>
  );
};

export default DashboardInfo;
