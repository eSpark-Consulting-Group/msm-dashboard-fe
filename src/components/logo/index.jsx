import { Stack, Typography } from "@mui/material";

const Logo = ({ bigLogo }) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="flex-end"
      gap="4px"
    >
      <Typography
        lineHeight={bigLogo ? "50px" : "22px"}
        fontSize={bigLogo ? 60 : 24}
        fontWeight={900}
        color="secondary.main"
        sx={{
          WebkitTextStroke: "1px #0C89E21A",
          textShadow: `0 0 4px rgba(12,137,226,0.1), 0 0 8px rgba(12,137,226,0.1)`,
          display: "inline-block",
        }}
      >
        EIN
      </Typography>
      <Typography
        lineHeight={bigLogo ? "40px" : "17px"}
        fontSize={bigLogo ? 40 : 16}
        fontWeight={900}
        color="secondary.light"
      >
        CLOUD
      </Typography>
    </Stack>
  );
};

export default Logo;
