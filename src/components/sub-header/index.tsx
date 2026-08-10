import { Box, Stack, Typography } from "@mui/material";
import Button from "../buttons";

const SubHeader = ({ heading, sideText, subHeading, buttonText, onClick }) => {
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          gap={3}
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
            sx={{ width: "160px" }}
            variant="outlined"
            onClick={onClick ? onClick : () => {}}
          >
            {buttonText}
          </Button>
        )}
      </Stack>
      {subHeading && (
        <Typography mt="16px" color="primary.light" fontSize={20} fontWeight={400}>
          {subHeading}
        </Typography>
      )}
    </Box>
  );
};

export default SubHeader;
