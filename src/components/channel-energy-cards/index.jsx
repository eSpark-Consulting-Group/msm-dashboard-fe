import { Grid, Box, Typography, Skeleton } from "@mui/material";
import { PhaseCards, StackedBarChart } from "../../components";
import { energyCards } from "../../constant";

const EnergyCards = ({
  energyData,
  phaseAgraph,
  phaseBgraph,
  phaseCgraph,
  isLoading,
}) => {
  const data = [
    { name: "1", A: 0.5, B: 0.5 },
    { name: "2", A: 0.2, B: 0.8 },
    { name: "3", A: 0.4, B: 0.6 },
    { name: "4", A: 0.85, B: 0.15 },
    { name: "5", A: 0.8, B: 0.2 },
    { name: "6", A: 0.7, B: 0.3 },
    { name: "7", A: 0.1, B: 0.9 },
    { name: "8", A: 0.4, B: 0.6 },
    { name: "9", A: 0.5, B: 0.5 },
    { name: "10", A: 0.97, B: 0.03 },
  ];

  const getPhaseGraph = (i) => {
    if (i === 0) return phaseAgraph;
    if (i === 1) return phaseBgraph;
    return phaseCgraph;
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
              <Box p={2} border="0.64px solid #000000" borderRadius={"7px"}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "15px",
                  }}
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
                    Real time last
                    <br /> min
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    columnGap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
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
                  </Box>
                  <StackedBarChart
                    data={getPhaseGraph(i)}
                    barKeys={["A", "B"]}
                    colors={["#5CC8BE", "#357AF6"]}
                    height={200}
                  />
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
