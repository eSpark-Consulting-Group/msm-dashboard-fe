import { Box, Grid, Typography } from "@mui/material";
import { powerCards } from "../../../../constant";
import { DynamicTabs2, PhaseCards } from "../../../../components";

const Power = ({ data }) => {
  const tabs = [
    {
      id: 1,
      label: "Real Time",
      content: (
        <Grid container spacing={2}>
          {data &&
            Array.isArray(data) &&
            data?.map((item, index) => (
              <PhaseCards
                color={item?.color}
                heading={item?.heading}
                icon={item?.icon}
                time={item?.time}
                value={item?.value}
                valueColor={item?.valueColor}
                headingSize={item?.headingSize}
                key={index}
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
          {data &&
            Array.isArray(data) &&
            data?.map((item, index) => (
              <PhaseCards
                color={item?.color}
                heading={item?.heading}
                icon={item?.icon}
                time={item?.time}
                value={item?.value}
                valueColor={item?.valueColor}
                headingSize={item?.headingSize}
                key={index}
              />
            ))}
        </Grid>
      ),
    },
  ];
  return (
    <>
      <DynamicTabs2 tabs={tabs} defaultActive={0} />
    </>
  );
};

export default Power;
