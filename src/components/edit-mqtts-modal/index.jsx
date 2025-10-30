import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import OutlinedInput from "../input";
import Button from "../buttons";
import { useUpdateMqttMutation } from "../../services/mqtt";
import { toast } from "react-toastify";
import { mqttsSettingsSchema } from "../../schemas";

const EditMqtts = ({ data, handleCancel }) => {
  const [mqtt, { isLoading }] = useUpdateMqttMutation();

  const formik = useFormik({
    initialValues: {
      mqtts_endpoint: data?.mqtts_endpoint ?? "",
      mqtts_port: data?.mqtts_port ?? "",
      mqtts_interval: data?.mqtts_interval ?? "",
      id: data?.id ?? "",
    },
    validationSchema: mqttsSettingsSchema,
    onSubmit: async (values) => {
      try {
        const obj = {
          mqtts_endpoint: values?.mqtts_endpoint,
          mqtts_port: values?.mqtts_port,
          mqtts_interval: values?.mqtts_interval,
        };
        console.log("Submitted values:", obj);
        // const res = await mqtt({ formData: obj, id: values?.id });
        // if (res?.data) {
        //   toast.success("MQTTS Protocol updated successfully");
        //   handleCancel();
        // }
        // if (res?.error) {
        //   toast?.error(res?.error?.data?.message, { toastId: "MQTTError" });
        //   handleCancel();
        // }
      } catch (error) {
        console.log(error);
        handleCancel();
      }
    },
  });

  return (
    <div>
      <Typography variant="h6" fontWeight="bold" fontSize="25px" color="#000">
        MQTTS Protocol
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
            label="MQTTs Endpoint"
            placeholder="MQTTs Endpoint"
            type="text"
            name="mqtts_endpoint"
            value={formik.values.mqtts_endpoint}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mqtts_endpoint && Boolean(formik.errors.mqtts_endpoint)}
            helperText={formik.touched.mqtts_endpoint && formik.errors.mqtts_endpoint}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="MQTTs Port"
            placeholder="MQTTs Port"
            type="number"
            name="mqtts_port"
            value={formik.values.mqtts_port}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.mqtts_port && Boolean(formik.errors.mqtts_port)
            }
            helperText={formik.touched.mqtts_port && formik.errors.mqtts_port}
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="MQTTs Interval"
            placeholder="MQTTs Interval"
            type="text"
            name="mqtts_interval"
            value={formik.values.mqtts_interval}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.mqtts_interval && Boolean(formik.errors.mqtts_interval)
            }
            helperText={formik.touched.mqtts_interval && formik.errors.mqtts_interval}
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

export default EditMqtts;
