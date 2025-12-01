import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import OutlinedInput from "../input";
import Button from "../buttons";
import { useUpdateMqttMutation } from "../../services/mqtt";
import { toast } from "react-toastify";
import { mqttSettingsSchema } from "../../schemas";

const EditMqtt = ({ data, handleCancel }) => {
  const [mqtt, { isLoading }] = useUpdateMqttMutation();

  const formik = useFormik({
    initialValues: {
      broker_ip: data?.broker_ip ?? "",
      broker_pass: data?.broker_pass ?? "",
      broker_port: data?.broker_port ?? "",
      broker_user: data?.broker_user ?? "",
      data_interval: data?.data_interval ?? "",
      mqtt_topic: data?.mqtt_topic ?? "",
      id: data?.id ?? "",
    },
    validationSchema: mqttSettingsSchema,
    onSubmit: async (values) => {
      try {
        const obj = {
          broker_ip: values?.broker_ip,
          broker_pass: values?.broker_pass,
          broker_port: values?.broker_port,
          broker_user: values?.broker_user,
          data_interval: values?.data_interval,
          mqtt_topic: values?.mqtt_topic,
        };
        const res = await mqtt({ formData: obj, id: values?.id });
        if (res?.data) {
          toast.success("MQTTS Protocol updated successfully");
          handleCancel();
        }
        if (res?.error) {
          toast?.error(res?.error?.data?.message, { toastId: "MQTTError" });
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
        MQTT Protocol
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
            label="Broker IP"
            placeholder="Broker IP"
            type="text"
            name="broker_ip"
            value={formik.values.broker_ip}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.broker_ip && Boolean(formik.errors.broker_ip)}
            helperText={formik.touched.broker_ip && formik.errors.broker_ip}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="Broker Port"
            placeholder="Broker Port"
            type="number"
            name="broker_port"
            value={formik.values.broker_port}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.broker_port && Boolean(formik.errors.broker_port)
            }
            helperText={formik.touched.broker_port && formik.errors.broker_port}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="Broker User"
            placeholder="Broker User"
            type="text"
            name="broker_user"
            value={formik.values.broker_user}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.broker_user && Boolean(formik.errors.broker_user)
            }
            helperText={formik.touched.broker_user && formik.errors.broker_user}
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="Broker Pass"
            placeholder="Broker Pass"
            type="password"
            name="broker_pass"
            value={formik.values.broker_pass}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.broker_pass && Boolean(formik.errors.broker_pass)
            }
            helperText={formik.touched.broker_pass && formik.errors.broker_pass}
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
            endAdornment={"Seconds"}
            isEndorementText={true}
            min={1}
          />
        </Box>

        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="MQTT Topic"
            placeholder="MQTT Topic"
            type="text"
            name="mqtt_topic"
            value={formik.values.mqtt_topic}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.mqtt_topic && Boolean(formik.errors.mqtt_topic)
            }
            helperText={formik.touched.mqtt_topic && formik.errors.mqtt_topic}
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

export default EditMqtt;
