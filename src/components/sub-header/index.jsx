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
  btnLoading,
  disabled,
  OTA_Files_Download_Button = false,
  onImportClick = () => {},
  onExportClick = () => {},
  importButtonLoading = false,
  exportButtonLoading = false,
}) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        flexWrap={"wrap"}
        gap={{ xs: 2, md: 3 }}
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
        <Stack direction={"row"} flexWrap={"wrap"} spacing={0} gap={2}>
          {OTA_Files_Download_Button && user?.role?.name !== "user" && (
            <Button
              sx={{
                width: { xs: "100%", sm: "max-content" },
                minWidth: "160px",
                fontSize: { xs: "14px", md: "16px", lg: "18px" },
              }}
              variant={variant}
              onClick={onImportClick}
              disableRipple
              loading={importButtonLoading}
              disabled={exportButtonLoading}
            >
              {"Import OTA File"}
            </Button>
          )}
          {OTA_Files_Download_Button && user?.role?.name !== "user" && (
            <Button
              sx={{
                width: { xs: "100%", sm: "max-content" },
                minWidth: "160px",
                fontSize: { xs: "14px", md: "16px", lg: "18px" },
              }}
              variant={variant}
              onClick={onExportClick}
              disableRipple
              loading={exportButtonLoading}
              disabled={importButtonLoading}
            >
              {"Export OTA Files"}
            </Button>
          )}
          {user?.role?.name !== "user" && buttonText && (
            <Button
              sx={{
                width: { xs: "100%", sm: "max-content" },
                minWidth: "160px",
                fontSize: { xs: "14px", md: "16px", lg: "18px" },
              }}
              variant={variant}
              onClick={onClick ? onClick : () => {}}
              disableRipple
              loading={btnLoading}
              disabled={disabled}
            >
              {buttonText}
            </Button>
          )}
        </Stack>
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
