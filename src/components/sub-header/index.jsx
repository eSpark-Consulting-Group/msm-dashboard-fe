import { Box, Stack, Typography } from "@mui/material";
import Button from "../buttons";

const SubHeader = ({
  heading,
  sideText,
  subHeading,
  buttonText,
  onClick,
  variant = "outlined",
}) => {
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
          <Typography color="primary.dark" fontSize={40} fontWeight={900}>
            {heading}
          </Typography>
          {sideText && (
            <Typography color="primary.light" fontSize={20} fontWeight={400}>
              {sideText}
            </Typography>
          )}
        </Stack>
        {buttonText && (
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
