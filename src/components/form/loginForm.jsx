import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas";
import OutlinedInput from "../input";
import { useLoginMutation } from "../../services/auth";

const LoginForm = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      login({ email: values.email, password: values.password }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message || "Login failed");
          return;
        }
        if (res?.data) {
          if (values.remember) {
            const encoded = btoa(
              JSON.stringify({ email: values.email, password: values.password })
            );
            localStorage.setItem("rememberCreds", encoded);
          } else {
            localStorage.removeItem("rememberCreds");
          }

          navigate("/");
        }
      });
    },
  });

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
        console.error("Failed to decode saved creds", err);
      }
    }
  }, []);

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

      <FormControlLabel
        control={
          <Checkbox
            id="remember"
            name="remember"
            checked={formik.values.remember}
            onChange={formik.handleChange}
            sx={{
              color: "#A1A1AA",
              "&.Mui-checked": {
                color: "#147FCC",
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
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
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
