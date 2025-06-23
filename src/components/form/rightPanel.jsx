import { Box } from "@mui/material";

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
      <Box sx={{ width: "100%" }}>
        <img
          src="/images/login_image.png"
          alt="Dashboard Preview"
          style={{
            width: "100%",
            height: "800px",
            objectFit: "cover",
            borderRadius: 16,
            padding: "10px",
          }}
        />
      </Box>
    </Box>
  );
};

export default RightPanel;
