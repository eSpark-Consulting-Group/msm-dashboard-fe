import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import OutlinedInput from "../input";
import { useLoginMutation } from "../../services/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();
  const toastShownRef = useRef(false);

  // Handle errors via useEffect instead of try-catch
  useEffect(() => {
    if (error && !toastShownRef.current) {
      toastShownRef.current = true;
      toast.error(error?.data?.message || "Login failed", {
        toastId: "login-error",
      });

      // Reset after delay
      setTimeout(() => {
        toastShownRef.current = false;
      }, 1500);
    }
  }, [error]);

  // Load remembered credentials on mount
  useEffect(() => {
    const savedCreds = localStorage.getItem("rememberCreds");
    if (savedCreds) {
      try {
        const decoded = JSON.parse(atob(savedCreds));
        formik.setValues({
          email: decoded.email || "",
          password: decoded.password || "",
          remember: true,
        });
      } catch (err) {
        console.error("Failed to decode saved creds:", err);
      }
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      if (toastShownRef.current) return;
      toastShownRef.current = true;

      try {
        const res = await login({
          email: values.email,
          password: values.password,
        }).unwrap();

        toast.success("Login successful", { toastId: "LoginSuccess" });

        // Handle "Remember me"
        if (values.remember) {
          const encoded = btoa(
            JSON.stringify({
              email: values.email,
              password: values.password,
            })
          );
          localStorage.setItem("rememberCreds", encoded);
        } else {
          localStorage.removeItem("rememberCreds");
        }

        navigate("/");
      } catch (err) {
        // Error is now handled by useEffect above
        console.error("Login error:", err);
      } finally {
        setTimeout(() => {
          toastShownRef.current = false;
        }, 1500);
      }
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="off"
    >
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

      <Box sx={{ mt: 2 }}>
        <OutlinedInput
          label="Password"
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

      <Link to="/verify-email" style={{ textDecoration: "none" }}>
        <Typography sx={{ my: "10px", cursor: "pointer" }}>
          Forgot Password?
        </Typography>
      </Link>

      <FormControlLabel
        control={
          <Checkbox
            id="remember"
            name="remember"
            checked={formik.values.remember}
            onChange={formik.handleChange}
            sx={{
              color: "#A1A1AA",
              "&.Mui-checked": { color: "#147FCC" },
              "&:hover": { backgroundColor: "transparent" },
            }}
          />
        }
        label="Remember me"
      />

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
            "&:hover": {
              backgroundColor: "#147FCC",
            },
            "&:disabled": {
              backgroundColor: "#A1A1AA",
              cursor: "not-allowed",
            },
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
