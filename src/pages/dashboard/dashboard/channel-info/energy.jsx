import { useSelector } from "react-redux";
import { DynamicTabs2, EnergyCards } from "../../../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetLastTenTelemetryQuery } from "../../../../services/telemetry";
import { useSocket } from "../../../../SocketTest";

const Energy = ({ data }) => {
  const { energyData, isSocketHasEnergy } = useSelector(
    (state) => state?.telemetry
  );

  const { subscribeToTelemetry, unsubscribeFromTelemetry } = useSocket();

  const { id, channelId } = useParams();
  let currentChannel = channelId.split("-")[1];
  const [phaseAGraph, setPhaseAGraph] = useState([]);
  const [phaseBGraph, setPhaseBGraph] = useState([]);
  const [phaseCGraph, setPhaseCGraph] = useState([]);
  const channelNum = Number(currentChannel);

  useEffect(() => {
    if (!id || !channelNum) return;

    // Subscribe
    subscribeToTelemetry(id, channelNum);

    // Cleanup runs when channelId or id changes too
    return () => {
      unsubscribeFromTelemetry(id, channelNum);
    };
  }, [id, channelNum, subscribeToTelemetry, unsubscribeFromTelemetry]);

  const { data: graphData, isLoading: graphLoading } =
    useGetLastTenTelemetryQuery(
      {
        device_uuid: id,
        channel_id: currentChannel,
      },
      { skip: !id || !currentChannel }
    );

  const [realTimeData, setRealTimeData] = useState([]);

  useEffect(() => {
    if (!isSocketHasEnergy) {
      setRealTimeData(data);
    } else {
      setRealTimeData(energyData);
    }
  }, [isSocketHasEnergy, data]);

  useEffect(() => {
    if (isSocketHasEnergy) {
      setRealTimeData(energyData);
    }
  }, [energyData, isSocketHasEnergy]);

  useEffect(() => {
    if (graphData) {
      const data = graphData?.data;
      const buildPhaseData = (phase) => {
        return data
          .filter((d) => d.phase === phase)
          .map((item, idx) => ({
            name: (idx + 1).toString(),
            A: item?.avg_active_energy_positive ?? 0,
            B: item?.avg_active_energy_negative ?? 0,
          }));
      };

      const phaseAData = buildPhaseData("a");
      const phaseBData = buildPhaseData("b");
      const phaseCData = buildPhaseData("c");
      setPhaseAGraph(phaseAData);
      setPhaseBGraph(phaseBData);
      setPhaseCGraph(phaseCData);
    }
  }, [graphData]);

  const tabs = [
    {
      id: 1,
      label: "Real Time",
      content: (
        <EnergyCards
          energyData={realTimeData}
          phaseAgraph={phaseAGraph}
          phaseBgraph={phaseBGraph}
          phaseCgraph={phaseCGraph}
          isLoading={graphLoading}
        />
      ),
    },
    {
      id: 2,
      label: "Average value ",
      content: (
        <EnergyCards
          energyData={data}
          phaseAgraph={phaseAGraph}
          phaseBgraph={phaseBGraph}
          phaseCgraph={phaseCGraph}
          isLoading={graphLoading}
        />
      ),
    },
  ];
  return (
    <>
      <DynamicTabs2 tabs={tabs} defaultActive={0} />
    </>
  );
};

export default Energy;
