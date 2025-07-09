import { Box, Grid } from "@mui/material";
import { generalCards } from "../../../../constant";
import { PhaseCards } from "../../../../components/index.js";

const General = () => {
  return (
    <Grid container spacing={2}>
      {generalCards?.map((item, index) => (
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
  );
};

export default General;
