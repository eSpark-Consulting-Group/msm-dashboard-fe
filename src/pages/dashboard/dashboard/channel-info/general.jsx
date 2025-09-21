import { Box, Grid } from "@mui/material";
import { generalCards } from "../../../../constant";
import { PhaseCards } from "../../../../components";

const General = ({ data }) => {
  return (
    <Grid container spacing={2}>
      {data &&
        Array.isArray(data) &&
        data?.length > 0 &&
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
            phase={item?.phase}
          />
        ))}
    </Grid>
  );
};

export default General;
