import { useFormik } from "formik";
import React from "react";
import { Box, Typography } from "@mui/material";
import OutlinedInput from "../input";
import Button from "../buttons";
import { useUpdateSftpMutation } from "../../services/sftp";
import { toast } from "react-toastify";

const SftpEditModal = ({ data, handleCancel }) => {
  const [sftp, { isLoading }] = useUpdateSftpMutation();
  const formik = useFormik({
    initialValues: {
      server_ip: data?.server_ip ?? "",
      server_port: data?.server_port ?? "",
      username: data?.username ?? "",
      password: data?.password ?? "",
      data_interval: data?.data_interval ?? "",
      id: data?.id ?? "",
    },
    onSubmit: async (values) => {
      try {
        const obj = {
          server_ip: values?.server_ip,
          server_port: values?.server_port,
          username: values?.username,
          password: values?.password,
          data_interval: values?.data_interval,
        };
        const res = await sftp({ formData: obj, id: values?.id });
        if (res?.data) {
          toast.success("SFTP Configuration updated successfully");
          handleCancel();
        }
        if (res?.error) {
          toast?.error(res?.error?.data?.message, { toastId: "SFTPError" });
          handleCancel();
        }
      } catch (error) {
        console.log(error);
        handleCancel();
      }
    },
  });

  return (
    <div>
      <Typography variant="h6" fontWeight="bold" fontSize="25px" color="#000">
        SFTP Configuration
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
            label="Server IP"
            placeholder="Server IP"
            type="text"
            name="server_ip"
            value={formik.values.server_ip}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.server_ip && Boolean(formik.errors.server_ip)}
            helperText={formik.touched.server_ip && formik.errors.server_ip}
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="Server Port"
            placeholder="Server Port"
            type="number"
            name="server_port"
            value={formik.values.server_port}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.server_port && Boolean(formik.errors.server_port)
            }
            helperText={formik.touched.server_port && formik.errors.server_port}
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="Username"
            placeholder="Username"
            type="text"
            name="username"
            value={formik.values.username}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="Data Interval"
            placeholder="Data Interval"
            type="number"
            name="data_interval"
            value={formik.values.data_interval}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.data_interval &&
              Boolean(formik.errors.data_interval)
            }
            helperText={
              formik.touched.data_interval && formik.errors.data_interval
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
            <Button variant="outlined" disableRipple onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
          <Box sx={{ width: "203.70px", height: "50px" }}>
            <Button
              disabled={isLoading}
              loading={isLoading}
              variant="contained"
              disableRipple
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default SftpEditModal;
