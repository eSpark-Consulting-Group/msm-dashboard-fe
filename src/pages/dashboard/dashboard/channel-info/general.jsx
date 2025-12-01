import { Box, Grid, Typography } from "@mui/material";
import { generalCards } from "../../../../constant";
import { PhaseCards } from "../../../../components";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const General = ({ data, temperature }) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const { generalData, isSocketHasGeneral } = useSelector(
    (state) => state?.telemetry
  );
  const [realTimeData, setRealTimeData] = useState([]);

  useEffect(() => {
    if (isSocketHasGeneral) {
      setRealTimeData(generalData);
    } else {
      setRealTimeData(data);
    }
  }, [isSocketHasGeneral, generalData, data]);

  return (
    <Grid container spacing={2}>
      {/* {
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
            Temperature: {temperature} °C
          </Typography>
        </Grid>
      } */}
      {realTimeData &&
        Array.isArray(realTimeData) &&
        realTimeData?.length > 0 &&
        realTimeData?.map((item, index) => (
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
