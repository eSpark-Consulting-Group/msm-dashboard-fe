import { Box, Typography } from "@mui/material";
import { disable, disconnect, flashFilled, flashUnfilled } from "../../assets";

const Channels = ({ variant, name, onClick }) => {
  const showBackdrop = variant === "unfilled" || variant === "disconnect";

  const getImageBackground = () => {
    if (variant === "unfilled") {
      return "#0c89e242";
    } else if (variant === "disconnect") {
      return "#E2E20C59";
    }
    return "transparent";
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "100%", sm: "45%", md: "216px" },
        cursor:
          variant === "connected" || variant === "unfilled"
            ? "pointer"
            : "not-allowed",
      }}
      onClick={
        variant === "connected" || variant === "unfilled" ? onClick : () => {}
      }
    >
      <Box
        sx={{
          width: "100%",
          height: "150px",
          border:
            variant === "unfilled" || variant === "connected"
              ? "1.09px solid #0C89E2"
              : variant === "disable"
              ? "1.09px solid #454545"
              : "1.09px solid #E1C70D",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: variant === "connected" ? "#0C89E2" : "transparent",
          borderRadius: "28px",
        }}
      >
        <Box
          sx={{
            background: showBackdrop ? getImageBackground() : "transparent",
            boxShadow: showBackdrop
              ? `-6px -3px 14px 5px ${getImageBackground()}`
              : "none",
            position: "relative",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backdropFilter: "blur(44.673179626464844px)",
          }}
        >
          <img
            src={
              variant === "unfilled"
                ? flashUnfilled
                : variant === "connected"
                ? flashFilled
                : variant === "disable"
                ? disable
                : disconnect
            }
            alt=""
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
      <Typography sx={{ fontSize: "25.19px", fontWeight: "700" }}>
        {name}
      </Typography>
    </Box>
  );
};

export default Channels;
