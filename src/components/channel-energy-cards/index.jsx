import { Grid, Box, Typography, Skeleton } from "@mui/material";
import { PhaseCards } from "../../components";
import { energyCards } from "../../constant";
import ActiveEnergyChart from "../stack-chart/index";

const EnergyCards = ({
  energyData,
  phaseAgraph,
  phaseBgraph,
  phaseCgraph,
  isLoading,
  phaseTime,
  reactivePhaseAgraph,
  reactivePhaseBgraph,
  reactivePhaseCgraph,
}) => {
  const getPhaseGraph = (i) => {
    if (i === 0) return phaseAgraph;
    if (i === 1) return phaseBgraph;
    return phaseCgraph;
  };
  const getPhaseReactiveGraph = (i) => {
    if (i === 0) return reactivePhaseAgraph;
    if (i === 1) return reactivePhaseBgraph;
    return reactivePhaseCgraph;
  };

  return (
    <>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {energyData &&
          Array.isArray(energyData) &&
          energyData?.map((item, index) => (
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
        {[...Array(3)].map((_, i) => (
          <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={i}>
            {isLoading ? (
              <Skeleton variant="rectangular" sx={{ height: "200px" }} />
            ) : (
              <Box border="0.64px solid #000000" borderRadius={"7px"}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "15px",
                  }}
                  p={2}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: i === 0 ? "red" : i === 1 ? "#9d9d14" : "blue",
                      fontWeight: "600",
                    }}
                  >
                    Phase {i === 0 ? "A" : i === 1 ? "B" : "C"}- ACTIVE ENERGY
                    +/-
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "9.07px",
                      color: "#1C1C1E9E",
                      fontWeight: "600",
                    }}
                  >
                    {i === 0
                      ? phaseTime?.a
                      : i === 1
                      ? phaseTime?.b
                      : phaseTime?.c}
                    <br />
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  {/* <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "185px",
                      position: "relative",
                      bottom: "5px",
                    }}
                  >
                    {["100", "80", "60", "40", "20", "0%"]?.map(
                      (item, index) => (
                        <Typography
                          sx={{ fontSize: "7px", color: "#8E8E93" }}
                          key={index}
                        >
                          {item}
                        </Typography>
                      )
                    )}
                  </Box> */}
                  {/* <StackedBarChart
                    data={getPhaseGraph(i)}
                    barKeys={["A", "B"]}
                    colors={["#5CC8BE", "#357AF6"]}
                    height={200}
                  /> */}
                  <ActiveEnergyChart data={getPhaseGraph(i)} type={1} />
                </Box>
              </Box>
            )}
          </Grid>
        ))}
        {[...Array(3)].map((_, i) => (
          <Grid item size={{ xs: 12, md: 6, lg: 4 }} key={i}>
            {isLoading ? (
              <Skeleton variant="rectangular" sx={{ height: "200px" }} />
            ) : (
              <Box border="0.64px solid #000000" borderRadius={"7px"}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "15px",
                  }}
                  p={2}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      color: i === 0 ? "red" : i === 1 ? "#9d9d14" : "blue",
                      fontWeight: "600",
                    }}
                  >
                    Phase {i === 0 ? "A" : i === 1 ? "B" : "C"}- REACTIVE ENERGY
                    +/-
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "9.07px",
                      color: "#1C1C1E9E",
                      fontWeight: "600",
                    }}
                  >
                    {i === 0
                      ? phaseTime?.a
                      : i === 1
                      ? phaseTime?.b
                      : phaseTime?.c}
                    <br />
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  {/* <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "185px",
                      position: "relative",
                      bottom: "5px",
                    }}
                  >
                    {["100", "80", "60", "40", "20", "0%"]?.map(
                      (item, index) => (
                        <Typography
                          sx={{ fontSize: "7px", color: "#8E8E93" }}
                          key={index}
                        >
                          {item}
                        </Typography>
                      )
                    )}
                  </Box> */}
                  {/* <StackedBarChart
                    data={getPhaseGraph(i)}
                    barKeys={["A", "B"]}
                    colors={["#5CC8BE", "#357AF6"]}
                    height={200}
                  /> */}
                  <ActiveEnergyChart data={getPhaseReactiveGraph(i)} type={2} />
                </Box>
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default EnergyCards;
