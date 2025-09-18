import { useSelector } from "react-redux";
import { DynamicTabs2, EnergyCards } from "../../../../components";
import { useEffect, useState } from "react";

const Energy = ({ data }) => {
  const { energyData, isSocketHasEnergy } = useSelector(
    (state) => state?.telemetry
  );

  const [realTimeData, setRealTimeData] = useState([]);

  useEffect(() => {
    if (!isSocketHasEnergy) {
      setRealTimeData(data);
    } else {
      setRealTimeData(energyData);
    }
  }, [isSocketHasEnergy]);

  useEffect(() => {
    if (isSocketHasEnergy) {
      setRealTimeData(energyData);
    }
  }, [energyData, isSocketHasEnergy]);

  const tabs = [
    {
      id: 1,
      label: "Real Time",
      content: <EnergyCards energyData={realTimeData} />,
    },
    {
      id: 2,
      label: "Average value ",
      content: <EnergyCards energyData={data} />,
    },
  ];
  return (
    <>
      <DynamicTabs2 tabs={tabs} defaultActive={0} />
    </>
  );
};

export default Energy;
