import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { mainLogo } from "../../assets";
import RightPanel from "../../components/form/rightPanel";
import { Button, Logo, OutlinedInput } from "../../components";
import { useFormik } from "formik";
import { verifyEmailSchema } from "../../schemas";
import { useNavigate } from "react-router-dom";
import { useForgetPasswordMutation } from "../../services/auth";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [forgetData, { isLoading }] = useForgetPasswordMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: verifyEmailSchema,
    onSubmit: async (values) => {
      const body = {
        email: formik.values.email,
      };
      const res = await forgetData({ body });
      if (res?.data) {
        toast.success(res?.data?.message);
        setIsVerified(true);
        // navigate("/reset-password");
      }
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      }
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
          {isVerified ? (
            <Typography sx={{ textAlign: "center" }}>
              Password reset link has been sent to your email. You can close
              this window.
            </Typography>
          ) : (
            <>
              <Typography
                variant="h5"
                fontWeight={900}
                sx={{
                  fontSize: { xs: "28px", sm: "40px" },
                  color: "#454545",
                }}
              >
                Verify Email!
              </Typography>
              <Box sx={{ mt: 2 }}>
                <OutlinedInput
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  value={formik.values.email}
                  onInputChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
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
                  {/* {isLoading ? "Logging in..." : "Login"} */}
                  {isLoading ? "Verifying..." : "Verify Email"}
                </Button>
              </Box>
            </>
          )}
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

export default VerifyEmail;
