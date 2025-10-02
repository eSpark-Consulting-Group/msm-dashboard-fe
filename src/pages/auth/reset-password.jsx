import { Box, Grid, Typography } from "@mui/material";
import { mainLogo } from "../../assets";
import { Button, OutlinedInput } from "../../components";
import { useFormik } from "formik";
import RightPanel from "../../components/form/rightPanel";
import { passwordScehma } from "../../schemas";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/auth";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { id } = useParams();

  const [reserPass, { isLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      conPassword: "",
    },
    validationSchema: passwordScehma,
    onSubmit: async (values) => {
      const body = {
        token: id,
        newPassword: formik.values.password,
      };
      const res = await reserPass({ body });
      if (res?.data) {
        toast.success(res?.data?.message);
      }
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        // navigate("/login");
      }
      navigate("/login");
      //   navigate("/reset-password");
    },
  });
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
        <Box
          sx={{ width: "100%", maxWidth: 400 }}
          component={"form"}
          onSubmit={formik.handleSubmit}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
              flexWrap: "wrap",
            }}
          >
            <img src={mainLogo} alt="Logo" style={{ width: "353px" }} />
          </Box>

          <Typography
            sx={{
              color: "#0C89E2",
              fontSize: "60px",
              fontWeight: "900",
              textAlign: "center",
              my: 2,
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
          </Typography>

          <Typography
            variant="h5"
            fontWeight={900}
            sx={{
              fontSize: { xs: "28px", sm: "40px" },
              color: "#454545",
            }}
          >
            Reset Password!
          </Typography>
          <Box sx={{ mt: 2 }}>
            <OutlinedInput
              label="New Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onInputChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <OutlinedInput
              label="Confirm New Password"
              name="conPassword"
              type="password"
              placeholder="Enter your conPassword"
              value={formik.values.conPassword}
              onInputChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.conPassword && Boolean(formik.errors.conPassword)
              }
              helperText={
                formik.touched.conPassword && formik.errors.conPassword
              }
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 2,
                py: 1.5,
                width: "200px",
                height: "60px",
                borderRadius: "16px",
                backgroundColor: "#5AB4F4",
              }}
            >
              {isLoading ? "Loading..." : "Change Password"}
            </Button>
          </Box>
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

export default ResetPassword;
