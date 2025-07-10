import { Box } from "@mui/material";
import { loginFrame } from "../../assets";

const RightPanel = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      <Box
        component="img"
        src={loginFrame}
        alt="Dashboard Preview"
        sx={{
          width: "100%",
          height: "800px",
          objectFit: "cover",
          borderRadius: 2,
          p: "10px",
          "@media (min-width: 1440px)": {
            height: "1010px",
          },
        }}
      />
    </Box>
  );
};

export default RightPanel;
