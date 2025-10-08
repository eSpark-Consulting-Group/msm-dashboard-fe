import { Box, Typography } from "@mui/material";
import OutlinedInput from "../input";
import { useFormik } from "formik";
import Button from "../buttons";
import { useUpdateNtpMutation } from "../../services/ntp";
import { toast } from "react-toastify";

const NtpEditModal = ({ data, handleCancel }) => {
  const [ntpData, { isLoading }] = useUpdateNtpMutation();
  const formik = useFormik({
    initialValues: {
      server_1: data?.server_1 ?? "",
      server_2: data?.server_2 ?? "",
      server_3: data?.server_3 ?? "",
      id: data?.id ?? "",
    },
    onSubmit: async (values) => {
      try {
        const objToSend = {
          server_1: formik?.values?.server_1,
          server_2: formik?.values?.server_2,
          server_3: formik?.values?.server_3,
        };

        const res = await ntpData({
          id: formik?.values?.id,
          formData: { data: objToSend }, // 👈 wrap inside "data"
        });

        if (res?.data) {
          toast.success("Ntp Configuration updated successfully");
          handleCancel();
        }
        if (res?.error) {
          toast?.error(res?.error?.data?.message, { toastId: "NTPError" });
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
        Network Time Protocol
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
            label={"Server 1"}
            placeholder={"Server 1"}
            type={"text"}
            name={"server_1"}
            value={formik.values.server_1}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.server_1 && Boolean(formik.errors.server_1)}
            helperText={formik.touched.server_1 && formik.errors.server_1}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label={"Server 2"}
            placeholder={"Server 2"}
            type={"text"}
            name={"server_2"}
            value={formik.values.server_2}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.server_2 && Boolean(formik.errors.server_2)}
            helperText={formik.touched.server_2 && formik.errors.server_2}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label={"Server 3"}
            placeholder={"Server 3"}
            type={"text"}
            name={"server_3"}
            value={formik.values.server_3}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.server_3 && Boolean(formik.errors.server_3)}
            helperText={formik.touched.server_3 && formik.errors.server_3}
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

export default NtpEditModal;
