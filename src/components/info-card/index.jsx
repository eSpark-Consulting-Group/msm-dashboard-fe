import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const InfoCard = ({
  title,
  info,
  buttonLabel,
  onButtonClick,
  date,
  time,
  role,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        display="flex"
        justifyContent={isSmallScreen ? "center" : "space-between"}
        alignItems="center"
        mb={2}
        flexDirection={isSmallScreen ? "column" : "row"}
        gap={2}
        textAlign={isSmallScreen ? "center" : "left"}
      >
        <Typography variant="h6" fontWeight="bold" fontSize="25px" color="#000">
          {title}
        </Typography>
        {onButtonClick && buttonLabel && (
          <Button
            sx={{
              width: "103px",
              border: "1px solid #0C89E2",
              color: "#0C89E2",
              borderRadius: "10px",
              fontSize: "16px",
            }}
            variant="outlined"
            size="small"
            onClick={onButtonClick}
          >
            {buttonLabel}
          </Button>
        )}
      </Box>

      <Box>
        <Grid
          container
          spacing={2}
          justifyContent={isSmallScreen ? "center" : "flex-start"}
        >
          {info.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                width: "100%",
                boxShadow: "none",
                textAlign: isSmallScreen ? "center" : "left",
              }}
            >
              <Card
                elevation={1}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  boxShadow: "none",
                  border: "1px solid #E4E4E4",
                  height: "100%",
                }}
              >
                <Box
                  display="flex"
                  justifyContent={isSmallScreen ? "center" : "space-between"}
                  alignItems="center"
                  flexWrap="wrap"
                  gap={1}
                  flexDirection={isSmallScreen ? "column" : "row"}
                >
                  <Typography
                    variant="subtitle2"
                    color="text.secondary !important"
                    fontSize="20px"
                    fontWeight="400"
                    sx={{ mr: isSmallScreen ? 0 : 2 }}
                  >
                    {item.label}
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    gap={{
                      xs: "8px",
                      sm: "70px",
                    }}
                    justifyContent={isSmallScreen ? "center" : "flex-start"}
                    sx={{ wordBreak: "break-word" }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight="medium"
                      fontSize="20px"
                    >
                      {item.value}
                    </Typography>
                    {item.showIcon && role !== "user" && (
                      <img
                        src="/src/assets/icons/Ruler Cross Pen.svg"
                        alt="icon"
                        style={{ width: 18, height: 18 }}
                      />
                    )}
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {(date || time) && (
        <Box
          display="flex"
          justifyContent="center"
          flexWrap="wrap"
          gap={2}
          mt={5}
          textAlign="center"
        >
          {date && (
            <Box
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #E4E4E4",
                padding: "25px",
                borderRadius: "8px",
                fontSize: "20px",
                fontWeight: 400,
                color: "#000000",
                width: { xs: "100%", sm: "235px" },
                height: "113px",
              }}
            >
              Date:
              <div style={{ color: "#505050", marginTop: "8px" }}>{date}</div>
            </Box>
          )}
          {time && (
            <Box
              sx={{
                backgroundColor: "#fff",
                border: "1px solid #E4E4E4",
                padding: "25px",
                borderRadius: "8px",
                fontSize: "20px",
                fontWeight: 400,
                color: "#000000",
                width: { xs: "100%", sm: "235px" },
                height: "113px",
              }}
            >
              Time:
              <div style={{ color: "#505050", marginTop: "8px" }}>{time}</div>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default InfoCard;
