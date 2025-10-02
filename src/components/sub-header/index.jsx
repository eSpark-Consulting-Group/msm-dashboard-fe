import { Box, Stack, Typography } from "@mui/material";
import Button from "../buttons";
import { gtIcon } from "../../assets";
import { useSelector } from "react-redux";

const SubHeader = ({
  heading,
  sideText,
  subHeading,
  buttonText,
  onClick,
  variant = "outlined",
  userDetails,
  userName = "User",
}) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={"wrap"}
        gap={1}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          flexWrap={"wrap"}
          gap={1}
        >
          {userDetails && (
            <Box
              sx={{ display: "flex", columnGap: "10px", alignItems: "center" }}
            >
              <Typography
                sx={{ fontSize: { xs: "24px", md: "40px" }, opacity: "60%" }}
                color="#454545"
                fontWeight={900}
              >
                User
              </Typography>
              <img
                src={gtIcon}
                alt="Icon"
                style={{ width: "22px", height: "51px" }}
              />
              <Typography
                sx={{ fontSize: { xs: "24px", md: "40px" } }}
                color="#454545"
                fontWeight={900}
              >
                {userName}
              </Typography>
            </Box>
          )}
          <Typography color="primary.dark" fontSize={40} fontWeight={900}>
            {heading}
          </Typography>
          {sideText && (
            <Typography color="primary.light" fontSize={20} fontWeight={400}>
              {sideText}
            </Typography>
          )}
        </Stack>
        {user?.role?.name !== "user" && buttonText && (
          <Button
            sx={{ width: "max-content", minWidth: "160px" }}
            variant={variant}
            onClick={onClick ? onClick : () => {}}
            disableRipple
          >
            {buttonText}
          </Button>
        )}
      </Stack>
      {subHeading && (
        <Typography
          mt="8px"
          color="primary.light"
          fontSize={20}
          fontWeight={400}
        >
          {subHeading}
        </Typography>
      )}
    </Box>
  );
};

export default SubHeader;
