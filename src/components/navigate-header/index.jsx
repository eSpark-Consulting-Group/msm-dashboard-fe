import { Box, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { file, homeBlack, nextArrow } from "../../assets";

const NavigateHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const newLocation = location.pathname
    .split("/")
    .filter((item) => item !== "");

  const handleNavigate = (item) => {
    console.log(item);
    if (item === "dashboard") {
      navigate("/");
    } else if (item === "info") {
      navigate(`/dashboard/${newLocation[1]}/info`);
    } else if (item === "home") {
      navigate(`/dashboard/${newLocation[1]}/home`);
    }
  };

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
          sx={{
            display: "flex",
            columnGap: "7.02px",
            alignItems: "center",
            cursor:
              item === "dashboard" || item === "info" || item === "home"
                ? "pointer"
                : "auto",
          }}
          key={index}
          onClick={() => handleNavigate(item)}
        >
          <img src={index === 0 ? homeBlack : file} alt="Icon" />
          <Typography
            sx={{
              fontSize: "12.28px",
              fontWeight: "400",
              color: "#505050",
              textTransform: "capitalize",
            }}
          >
            {item.replace(/-/g, " ").replace(/%/g, " ")}
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
