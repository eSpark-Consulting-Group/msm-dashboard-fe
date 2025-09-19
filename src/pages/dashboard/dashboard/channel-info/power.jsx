import { Box, Grid } from "@mui/material";
import { DynamicTabs2, PhaseCards } from "../../../../components";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../../../../SocketTest";

const Power = ({ data }) => {
  const { powerCards, isSocketHasPower } = useSelector(
    (state) => state?.telemetry
  );

  const { id, channelId } = useParams();
  const currentChannel = channelId.split("-")[1];
  const channelNum = Number(currentChannel);

  const { subscribeToTelemetry, unsubscribeFromTelemetry } = useSocket();

  useEffect(() => {
    if (!id || !channelNum) return;

    // Subscribe
    subscribeToTelemetry(id, channelNum);

    // Cleanup runs when channelId or id changes too
    return () => {
      unsubscribeFromTelemetry(id, channelNum);
    };
  }, [id, channelNum, subscribeToTelemetry, unsubscribeFromTelemetry]);

  const [realTimeData, setRealTimeData] = useState([]);

  useEffect(() => {
    if (isSocketHasPower) {
      setRealTimeData(powerCards);
    } else {
      setRealTimeData(data);
    }
  }, [isSocketHasPower, powerCards, data]);

  const tabs = [
    {
      id: 1,
      label: "Real Time",
      content: (
        <Grid container spacing={2}>
          {realTimeData?.map((item, index) => (
            <PhaseCards
              key={index}
              color={item?.color}
              heading={item?.heading}
              icon={item?.icon}
              time={item?.time}
              value={item?.value}
              valueColor={item?.valueColor}
              headingSize={item?.headingSize}
            />
          ))}
        </Grid>
      ),
    },
    {
      id: 2,
      label: "Average value ",
      content: (
        <Grid container spacing={2}>
          {data?.map((item, index) => (
            <PhaseCards
              key={index}
              color={item?.color}
              heading={item?.heading}
              icon={item?.icon}
              time={item?.time}
              value={item?.value}
              valueColor={item?.valueColor}
              headingSize={item?.headingSize}
            />
          ))}
        </Grid>
      ),
    },
  ];

  return <DynamicTabs2 tabs={tabs} defaultActive={0} />;
};

export default Power;
