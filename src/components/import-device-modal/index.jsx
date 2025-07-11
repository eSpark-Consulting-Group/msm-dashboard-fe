import { Box, Typography } from "@mui/material";
import { useState } from "react";

const Steps = ({ number, text, completed }) => {
  return (
    <Box sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: completed?.includes(number) ? "#0077FF" : "#80BBFF",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
        }}
      >
        <Typography sx={{ color: "white", fontSize: "19px" }}>
          {number}
        </Typography>
      </Box>
      <Typography
        sx={{ fontSize: "18.97px", fontWeight: "500", color: "#454545" }}
      >
        {text}
      </Typography>
    </Box>
  );
};

const ImportDeviceModal = () => {
  const [completedSteps, setCompletedSteps] = useState([1]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "45px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
        <Steps number={1} text={"Select a  File"} completed={completedSteps} />
        <Box
          sx={{
            ml: { xs: "0px", md: "40px" },
            mr: { xs: "0px", md: "10px" },
            border: "1.28px dashed #0077FF",
            borderRadius: "6.38px",
            backgroundColor: "#FFFBFB",
            height: "105px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{ fontSize: "16.58px", color: "#A1A1AA", textAlign: "center" }}
          >
            Dashboard Order in mobile Application{" "}
          </Typography>
        </Box>
      </Box>
      <Steps
        number={2}
        text={"Import Configuration"}
        completed={completedSteps}
      />
      <Steps
        number={3}
        text={"Select Column Type"}
        completed={completedSteps}
      />
      <Steps
        number={4}
        text={"Create New Entities"}
        completed={completedSteps}
      />
      <Steps number={5} text={"Done"} completed={completedSteps} />
    </Box>
  );
};

export default ImportDeviceModal;
