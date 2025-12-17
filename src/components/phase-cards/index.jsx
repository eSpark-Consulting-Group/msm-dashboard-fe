import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const PhaseCards = ({
  color,
  icon,
  heading,
  time,
  value,
  valueColor,
  headingSize,
  phase,
}) => {
  const showBackdrop = color === "red" || color === "green";

  const getImageBackground = () => {
    if (color === "red") {
      return "#E4341559";
    } else if (color === "green") {
      return "#30F40859";
    }
    return "transparent";
  };

  const getValueColor = () => {
    if (valueColor === "red") {
      return "#E43415";
    } else if (valueColor === "green") {
      return "#35B21C";
    }
    return "black";
  };
  return (
    <Grid
      sx={{
        border: "0.9px solid #1E1E1E",
        borderRadius: "24.22px",
        // width: "330px",
        p: time ? "14px 10px" : "24px 2px",
        display: "flex",
        flexDirection: "column",
        rowGap: "15px",
      }}
      size={{ xs: 12, md: 6, lg: 4 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: "10px",
        }}
      >
        <Box
          sx={{
            background: showBackdrop ? getImageBackground() : "transparent",
            boxShadow: showBackdrop
              ? `0px -1px 12px 4px ${getImageBackground()}`
              : "none",
            position: "relative",
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            backdropFilter: "blur(27.5px)",
          }}
        >
          <img
            src={icon}
            alt=""
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: headingSize,
            fontWeight: "700",
            color: phase === "A" ? "red" : phase === "B" ? "#9d9d14" : "blue",
          }}
        >
          {heading}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: time ? "space-between" : "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "14.57px", fontWeight: "400", color: "#00000063" }}
        >
          {time}
        </Typography>
        <Typography
          sx={{
            fontSize: time ? "34px" : "44px",
            fontWeight: 700,
            color: getValueColor(),
          }}
        >
          {(() => {
            const match = String(value).match(/^(-?[\d.]+)([a-zA-Z%]+)?$/);
            if (!match) return value;

            const num = parseFloat(match[1]);
            const unit = match[2] || "";
            return `${num.toFixed(3)} ${unit}`;
          })()}
        </Typography>
      </Box>
    </Grid>
  );
};

export default PhaseCards;
