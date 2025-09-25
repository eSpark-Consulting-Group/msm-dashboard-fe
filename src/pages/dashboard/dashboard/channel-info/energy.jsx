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
  const [phaseTimesRT, setPhaseTimesRT] = useState({
    a: null,
    b: null,
    c: null,
  });
  const [phaseAGraphRT, setPhaseAGraphRt] = useState([]);
  const [phaseBGraphRT, setPhaseBGraphRt] = useState([]);
  const [phaseCGraphRT, setPhaseCGraphRt] = useState([]);

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
      setPhaseAGraphRt(phaseAData);
      setPhaseBGraphRt(phaseBData);
      setPhaseCGraphRt(phaseCData);
    }
  }, [graphData]);

  useEffect(() => {
    if (isSocketHasEnergy) {
      setRealTimeData(energyData);
    }

    const parseNumber = (val) => {
      if (!val) return 0;
      // Extract digits (with optional decimal) from string
      const num = parseFloat(val.replace(/[^0-9.-]+/g, ""));
      return isNaN(num) ? 0 : num;
    };

    if (isSocketHasEnergy && energyData?.length > 0) {
      energyData.forEach((socketItem) => {
        const phase = socketItem?.phase?.toLowerCase();
        if (!phase) return;

        const numericValue = parseNumber(socketItem?.value);
        const heading = socketItem?.heading || "";

        const updateGraph = (setGraph, phase) => {
          setGraph((prev) => {
            let updated = [...prev];

            // If no points yet, always create a new one
            if (updated.length === 0) {
              updated.push({
                name: "1",
                activePlus: heading.includes("(+)") ? numericValue : 0,
                activeMinus: heading.includes("(-)") ? numericValue : 0,
              });
            } else {
              let last = { ...updated[updated.length - 1] };

              // ✅ Check only against last point → skip duplicate
              if (
                (heading.includes("(+)") && last.activePlus === numericValue) ||
                (heading.includes("(-)") && last.activeMinus === numericValue)
              ) {
                return prev; // no changes
              }

              // If last point still has an empty slot → update it
              if (last.activePlus === 0 && heading.includes("(+)")) {
                last.activePlus = numericValue;
                updated[updated.length - 1] = last;
              } else if (last.activeMinus === 0 && heading.includes("(-)")) {
                last.activeMinus = numericValue;
                updated[updated.length - 1] = last;
              } else {
                // Otherwise → start a new point
                const newPoint = {
                  name: `${updated.length + 1}`,
                  activePlus: heading.includes("(+)") ? numericValue : 0,
                  activeMinus: heading.includes("(-)") ? numericValue : 0,
                };
                updated.push(newPoint);
              }
            }

            // Keep max 10 points
            if (updated.length > 10) {
              updated = updated.slice(1);
              updated = updated.map((point, index) => ({
                ...point,
                name: `${index + 1}`,
              }));
            }

            return updated;
          });
        };

        if (phase === "a") updateGraph(setPhaseAGraphRt, "a");
        if (phase === "b") updateGraph(setPhaseBGraphRt, "b");
        if (phase === "c") updateGraph(setPhaseCGraphRt, "c");
        setPhaseTimesRT((prev) => ({
          ...prev,
          [phase]: `Real Time ${dayjs().fromNow()}`,
        }));
      });
    }
  }, [energyData, isSocketHasEnergy]);

  const tabs = [
    {
      id: 1,
      label: "Real Time",
      content: (
        <EnergyCards
          energyData={realTimeData}
          phaseAgraph={phaseAGraphRT}
          phaseBgraph={phaseBGraphRT}
          phaseCgraph={phaseCGraphRT}
          isLoading={graphLoading}
          phaseTime={isSocketHasEnergy ? phaseTimesRT : phaseTimes}
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
