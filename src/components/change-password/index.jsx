import { Box, Typography } from "@mui/material";
import Button from "../buttons";
import { useFormik } from "formik";
import OutlinedInput from "../input";
import { passwordScehma2 } from "../../schemas";
import { useChangePasswordMutation } from "../../services/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { handleChangePassword } from "../../store/slices/auth";

const ChangePassword = ({ handleClose }) => {
  const [changePass, { isLoading }] = useChangePasswordMutation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: passwordScehma2,
    onSubmit: async (values) => {
      const body = {
        oldPassword: formik.values.oldPassword,
        newPassword: formik.values.newPassword,
      };
      const res = await changePass({ body });
      if (res?.data) {
        toast.success(res?.data?.message);
        dispatch(handleChangePassword());
        handleClose();
        return;
      }
      if (res?.error) {
        toast.error(res?.error?.data?.message);
        handleClose();
        return;
      }
    },
  });

  return (
    <div>
      <Typography
        variant="h6"
        fontWeight="bold"
        fontSize="25px"
        color="#000"
        mt={2}
      >
        Change password
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "25px",
          rowGap: "17px",
          mt: "10px",
        }}
        component={"form"}
        onSubmit={formik.handleSubmit}
      >
        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="Old Password"
            placeholder="Enter your old password"
            type="password"
            name="oldPassword"
            value={formik.values.oldPassword}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
            }
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="New Password"
            placeholder="Enter new password"
            type="password"
            name="newPassword"
            value={formik.values.newPassword}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="Confirm New Password"
            placeholder="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Box>

        <Box
          sx={{
            mt: "30px",
            display: "flex",
            justifyContent: "flex-end",
            columnGap: "20px",
            width: "100%",
          }}
        >
          <Box sx={{ width: "203.70px", height: "50px" }}>
            <Button variant="contained" disableRipple type="submit">
              Change Password
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ChangePassword;
