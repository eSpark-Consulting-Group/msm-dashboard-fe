import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../schemas";

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log("Login Data:", values);
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
        <Typography variant="subtitle2" fontWeight="bold" mb={0.5}>
          Username
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" fontWeight="bold" mb={0.5}>
          Password
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
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
          sx={{
            mt: 2,
            // borderRadius: 2,
            py: 1.5,
            width: "200px",
            height: "60px",
            borderRadius: "16px",
            backgroundColor: "#5AB4F4",
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};
export default LoginForm;
