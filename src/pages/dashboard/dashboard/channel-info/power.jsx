import { Grid } from "@mui/material";
import { powerCards } from "../../../../constant";
import { PhaseCards } from "../../../../components";

const Power = () => {
  return (
    <Grid container spacing={2}>
      {powerCards?.map((item, index) => (
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

export default Power;
