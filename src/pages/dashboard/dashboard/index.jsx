import { Box, Stack, Typography } from "@mui/material";
import { SubHeader } from "../../../components";

const Dashboard = () => {
  const cards = [
    [
      { label: "Total Devices", count: 40 },
      { label: "Active Devices", count: 25 },
      { label: "Inactive Devices", count: 15 },
    ],
    [
      { label: "Total Users", count: 40 },
      { label: "Active Users", count: 25 },
      { label: "Inactive Users", count: 15 },
    ],
    [
      { label: "Total Alarm", count: 40 },
      { label: "Active Alarm", count: 25 },
      { label: "Inactive Alarm", count: 15 },
    ],
  ];
  return (
    <>
      <SubHeader
        heading="Hey Alex -"
        sideText="here’s what’s happening with your device and users"
      />
      <Stack
        mt="35px"
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
      >
        {cards.map((card, ind) => (
          <Box
            sx={{
              width: { xs: "100%", lg: "353px" },
              minHeight: "135px",
              background: "#FFF",
              padding: { xs: "21px 15px", sm: "21px 35px" },
              border: "1px solid #E4E4E7",
              borderRadius: "10px",
            }}
            key={ind}
          >
            <Stack>
              {card.map((item) => (
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  key={item?.label}
                  gap={1}
                >
                  <Typography
                    fontSize={20}
                    fontWeight={400}
                    color="primary.dark"
                    sx={{
                      display: "list-item",
                      listStyleType: "disc",
                      listStylePosition: "inside",
                      marginLeft: "1.2rem",
                    }}
                  >
                    {item?.label}
                  </Typography>
                  <Typography
                    fontSize={20}
                    fontWeight={900}
                    color="secondary.dark"
                  >
                    {item?.count}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default Dashboard;
