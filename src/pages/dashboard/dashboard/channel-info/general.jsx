import { Box, Grid, Typography } from "@mui/material";
import { generalCards } from "../../../../constant";
import { PhaseCards } from "../../../../components";
import { useSearchParams } from "react-router-dom";

const General = ({ data, temperature }) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  return (
    <Grid container spacing={2}>
      {(tab === null || tab == 0) && (
        <Grid
          sx={{
            color: "#0C89E2",
            fontWeight: 600,
            whiteSpace: "nowrap",
            display: { xs: "block", lg: "none" },
            textAlign: "center",
          }}
          size={{ xs: 12 }}
        >
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            Temprature: {temperature} °C
          </Typography>
        </Grid>
      )}
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
