import { Box, Typography } from "@mui/material";

const StackedBarChart = ({ data, barKeys, colors, height = 145 }) => {
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Box display="flex" justifyContent={"space-between"} sx={{ flex: 1 }}>
        {data.map((item, index) => (
          <Box
            key={index}
            display="flex"
            flexDirection="column"
            height={height}
            width={"13px"}
          >
            {barKeys?.map((key, i) => (
              <>
                <Box
                  key={i}
                  sx={{
                    flexGrow: item[key],
                    backgroundColor: colors[i],
                    width: "100%",
                    marginBottom: i < barKeys.length - 1 ? "2px" : 0,
                  }}
                />
              </>
            ))}
            <Typography sx={{ fontSize: "7px", mt: "0px" }} align="center">
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          width: "100%",
          position: "absolute",
          height: "1px",
          backgroundColor: "#C7C7CC",
          bottom: "10px",
        }}
      ></Box>
    </Box>
  );
};

export default StackedBarChart;
