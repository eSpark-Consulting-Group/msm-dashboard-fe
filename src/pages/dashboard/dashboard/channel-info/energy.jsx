import { useSelector } from "react-redux";
import { DynamicTabs2, EnergyCards } from "../../../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetLastTenTelemetryQuery } from "../../../../services/telemetry";
import { useSocket } from "../../../../SocketTest";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

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
  const [phaseTimes, setPhaseTimes] = useState({
    a: null,
    b: null,
    c: null,
  });

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
        const filtered = data.filter((d) => d.phase === phase);

        if (filtered.length > 0) {
          // take the latest time (last entry for example)
          const latestTime = filtered[filtered.length - 1]?.timestamp ?? null;

          // update state for this phase
          setPhaseTimes((prev) => ({
            ...prev,
            [phase]: `Real Time ${dayjs(latestTime).fromNow()}`,
          }));
        }

        return filtered.map((item, idx) => ({
          name: (idx + 1).toString(),
          activePlus: item?.active_energy_positive ?? 0,
          activeMinus: item?.active_energy_negative ?? 0,
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
          phaseTime={phaseTimes}
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
          phaseTime={phaseTimes}
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
