import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { file, home, nextArrow } from "../../assets";

const NavigateHeader = () => {
  const location = useLocation();
  const newLocation = location.pathname
    .split("/")
    .filter((item) => item !== "");
  return (
    <Box
      sx={{
        ml: "30px",
        display: "flex",
        columnGap: "7.02px",
        alignItems: "center",
      }}
    >
      {newLocation?.map((item, index) => (
        <Box
          sx={{ display: "flex", columnGap: "7.02px", alignItems: "center" }}
          key={index}
        >
          <img src={index === 0 ? home : file} alt="Icon" />
          <Typography
            sx={{
              fontSize: "12.28px",
              fontWeight: "400",
              color: "#505050",
              textTransform: "capitalize",
            }}
          >
            {item.replace(/-/g, " ")}
          </Typography>
          {index !== newLocation?.length - 1 && (
            <img src={nextArrow} alt="Icon" />
          )}
        </Box>
      ))}
    </Box>
  );
};

export default NavigateHeader;
