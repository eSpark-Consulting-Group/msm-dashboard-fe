import { Box, Grid, Typography } from "@mui/material";
import LoginForm from "../../components/form/loginForm";
import RightPanel from "../../components/form/rightPanel";
import Logo from "../../components/logo";
import { mainLogo } from "../../assets";

const Login = () => {
  return (
    <Grid
      container
      sx={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <img src={mainLogo} alt="Logo" style={{ width: "120px" }} />
          </Box>
          {/* <Typography
            sx={{
              color: "#0C89E2",
              fontSize: "60px",
              fontWeight: "900",
              textAlign: "center",
            }}
          >
            EIN
            <Typography
              component={"span"}
              sx={{
                color: "#5AB4F4",
                fontSize: "40px",
                fontWeight: "900",
                ml: "10px",
              }}
            >
              CLOUD
            </Typography>
          </Typography> */}
          <Logo bigLogo={true} />

          <Typography
            variant="h5"
            fontWeight={900}
            sx={{
              fontSize: { xs: "28px", sm: "40px" },
              color: "#454545",
            }}
          >
            Welcome Back! 👋
          </Typography>
          {/* <Typography
            variant="body2"
            color="#a1a1aa"
            mt={1}
            mb={3}
            sx={{ fontSize: { xs: "14px", sm: "16px" } }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            gravida, metus nec malesuada pulvinar.
          </Typography> */}
          <LoginForm />
        </Box>
      </Grid>

      <Grid
        item
        md={6}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <RightPanel />
      </Grid>
    </Grid>
  );
};
export default Login;
