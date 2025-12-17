import { useSelector } from "react-redux";
import { DynamicTabs2, EnergyCards } from "../../../../components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetLastTenTelemetryQuery } from "../../../../services/telemetry";
import { useSocket } from "../../../../SocketTest";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const Energy = ({ data, newData }) => {
  const { energyData, isSocketHasEnergy } = useSelector(
    (state) => state?.telemetry
  );

  const { subscribeToTelemetry, unsubscribeFromTelemetry } = useSocket();

  const { id, channelId } = useParams();
  let currentChannel = channelId.split("-")[1];
  const [phaseAGraph, setPhaseAGraph] = useState([]);
  const [phaseBGraph, setPhaseBGraph] = useState([]);
  const [phaseCGraph, setPhaseCGraph] = useState([]);
  const [phaseTimes, setPhaseTimes] = useState({ a: null, b: null, c: null });
  const [phaseTimesRT, setPhaseTimesRT] = useState({
    a: null,
    b: null,
    c: null,
  });

  const [phaseAGraphRT, setPhaseAGraphRt] = useState([]);
  const [phaseBGraphRT, setPhaseBGraphRt] = useState([]);
  const [phaseCGraphRT, setPhaseCGraphRt] = useState([]);

  // ✅ NEW: for reactive energy
  const [phaseAGraphReactive, setPhaseAGraphReactive] = useState([]);
  const [phaseBGraphReactive, setPhaseBGraphReactive] = useState([]);
  const [phaseCGraphReactive, setPhaseCGraphReactive] = useState([]);
  const [phaseAGraphReactiveRT, setPhaseAGraphReactiveRt] = useState([]);
  const [phaseBGraphReactiveRT, setPhaseBGraphReactiveRt] = useState([]);
  const [phaseCGraphReactiveRT, setPhaseCGraphReactiveRt] = useState([]);

  const channelNum = Number(currentChannel);

  // useEffect(() => {
  //   if (!id || !channelNum) return;
  //   subscribeToTelemetry(id, channelNum);
  //   return () => {
  //     unsubscribeFromTelemetry(id, channelNum);
  //   };
  // }, [id, channelNum, subscribeToTelemetry, unsubscribeFromTelemetry]);

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
      setRealTimeData(newData);
    } else {
      setRealTimeData(energyData);
    }
  }, [isSocketHasEnergy, newData]);

  useEffect(() => {
    if (graphData) {
      const data = graphData?.data;
      const buildPhaseData = (phase) => {
        const filtered = data.filter((d) => d.phase === phase);

        if (filtered.length > 0) {
          const latestTime = filtered[filtered.length - 1]?.timestamp ?? null;
          setPhaseTimes((prev) => ({
            ...prev,
            [phase]: `Real Time ${dayjs(latestTime).fromNow()}`,
          }));
        }

        return filtered.map((item, idx) => ({
          name: (idx + 1).toString(),
          activePlus: item?.active_energy_positive ?? 0,
          activeMinus: item?.active_energy_negative ?? 0,
          reactivePlus: item?.reactive_energy_positive ?? 0, // ✅ added
          reactiveMinus: item?.reactive_energy_negative ?? 0, // ✅ added
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

      // ✅ also store for reactive graphs separately (if needed)
      setPhaseAGraphReactive(phaseAData);
      setPhaseBGraphReactive(phaseBData);
      setPhaseCGraphReactive(phaseCData);
      setPhaseAGraphReactiveRt(phaseAData);
      setPhaseBGraphReactiveRt(phaseBData);
      setPhaseCGraphReactiveRt(phaseCData);
    }
  }, [graphData]);

  useEffect(() => {
    if (isSocketHasEnergy) {
      setRealTimeData(energyData);
    }

    const parseNumber = (val) => {
      if (!val) return 0;
      const num = parseFloat(val.replace(/[^0-9.-]+/g, ""));
      return isNaN(num) ? 0 : num;
    };

    if (isSocketHasEnergy && energyData?.length > 0) {
      energyData.forEach((socketItem) => {
        const phase = socketItem?.phase?.toLowerCase();
        if (!phase) return;

        const numericValue = parseNumber(socketItem?.value);
        const heading = socketItem?.heading || "";

        const updateGraph = (setGraph) => {
          setGraph((prev) => {
            let updated = [...prev];

            // Parse heading format: "PHASE A-Active Energy (+)"
            const [phasePart, energyPart] = heading.split("-");
            const energyType = energyPart?.toLowerCase().includes("reactive")
              ? "reactive"
              : "active";
            const polarity = energyPart?.includes("(+)") ? "plus" : "minus";

            if (updated.length === 0) {
              updated.push({
                name: "1",
                activePlus:
                  energyType === "active" && polarity === "plus"
                    ? numericValue
                    : 0,
                activeMinus:
                  energyType === "active" && polarity === "minus"
                    ? numericValue
                    : 0,
                reactivePlus:
                  energyType === "reactive" && polarity === "plus"
                    ? numericValue
                    : 0,
                reactiveMinus:
                  energyType === "reactive" && polarity === "minus"
                    ? numericValue
                    : 0,
              });
            } else {
              let last = { ...updated[updated.length - 1] };

              // ✅ skip duplicates
              if (
                (energyType === "active" &&
                  polarity === "plus" &&
                  last.activePlus === numericValue) ||
                (energyType === "active" &&
                  polarity === "minus" &&
                  last.activeMinus === numericValue) ||
                (energyType === "reactive" &&
                  polarity === "plus" &&
                  last.reactivePlus === numericValue) ||
                (energyType === "reactive" &&
                  polarity === "minus" &&
                  last.reactiveMinus === numericValue)
              ) {
                return prev;
              }

              // If last point has empty slot → fill it
              if (
                energyType === "active" &&
                polarity === "plus" &&
                last.activePlus === 0
              ) {
                last.activePlus = numericValue;
                updated[updated.length - 1] = last;
              } else if (
                energyType === "active" &&
                polarity === "minus" &&
                last.activeMinus === 0
              ) {
                last.activeMinus = numericValue;
                updated[updated.length - 1] = last;
              } else if (
                energyType === "reactive" &&
                polarity === "plus" &&
                last.reactivePlus === 0
              ) {
                last.reactivePlus = numericValue;
                updated[updated.length - 1] = last;
              } else if (
                energyType === "reactive" &&
                polarity === "minus" &&
                last.reactiveMinus === 0
              ) {
                last.reactiveMinus = numericValue;
                updated[updated.length - 1] = last;
              } else {
                // Otherwise → create new point
                updated.push({
                  name: `${updated.length + 1}`,
                  activePlus:
                    energyType === "active" && polarity === "plus"
                      ? numericValue
                      : 0,
                  activeMinus:
                    energyType === "active" && polarity === "minus"
                      ? numericValue
                      : 0,
                  reactivePlus:
                    energyType === "reactive" && polarity === "plus"
                      ? numericValue
                      : 0,
                  reactiveMinus:
                    energyType === "reactive" && polarity === "minus"
                      ? numericValue
                      : 0,
                });
              }
            }

            // Keep max 10 points
            if (updated.length > 10) {
              updated = updated.slice(1).map((point, index) => ({
                ...point,
                name: `${index + 1}`,
              }));
            }

            return updated;
          });
        };

        if (phase === "a") updateGraph(setPhaseAGraphRt);
        if (phase === "b") updateGraph(setPhaseBGraphRt);
        if (phase === "c") updateGraph(setPhaseCGraphRt);

        // ✅ also update reactive separately (if you want distinct state arrays)
        if (phase === "a") updateGraph(setPhaseAGraphReactiveRt);
        if (phase === "b") updateGraph(setPhaseBGraphReactiveRt);
        if (phase === "c") updateGraph(setPhaseCGraphReactiveRt);

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
          reactivePhaseAgraph={phaseAGraphReactiveRT}
          reactivePhaseBgraph={phaseBGraphReactiveRT}
          reactivePhaseCgraph={phaseCGraphReactiveRT}
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
          reactivePhaseAgraph={phaseAGraphReactive}
          reactivePhaseBgraph={phaseBGraphReactive}
          reactivePhaseCgraph={phaseCGraphReactive}
          isLoading={graphLoading}
          phaseTime={phaseTimes}
        />
      ),
    },
  ];

  return <DynamicTabs2 tabs={tabs} defaultActive={0} />;
};

export default Energy;
