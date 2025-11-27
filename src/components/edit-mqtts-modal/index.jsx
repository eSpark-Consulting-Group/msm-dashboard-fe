import { useFormik } from "formik";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import OutlinedInput from "../input";
import Button from "../buttons";
import { useUpdateMqttsMutation } from "../../services/mqtt";
import { toast } from "react-toastify";
import { mqttsSettingsSchema } from "../../schemas";

const EditMqtts = ({ data, handleCancel }) => {
  const [mqtts, { isLoading }] = useUpdateMqttsMutation();

  const formik = useFormik({
    initialValues: {
      broker_ip: data?.broker_ip ?? "",
      // broker_port: data?.broker_port ?? "",
      data_interval: data?.data_interval ?? "",
      root_ca: Boolean(data?.root_ca),
      claim_cert: Boolean(data?.claim_cert),
      claim_key: Boolean(data?.claim_key),
      id: data?.id ?? "",
    },
    validationSchema: mqttsSettingsSchema,
    onSubmit: async (values) => {
      try {
        const obj = {
          broker_ip: values?.broker_ip,
          // broker_port: values?.broker_port,
          data_interval: values?.data_interval,
          root_ca: values?.root_ca ? "true" : "false",
          claim_cert: values?.claim_cert ? "true" : "false",
          claim_key: values?.claim_key ? "true" : "false",
        };
        const res = await mqtts({ formData: obj, id: values?.id });
        if (res?.data) {
          toast.success("MQTTS Protocol updated successfully");
          handleCancel();
        }
        if (res?.error) {
          toast?.error(res?.error?.data?.message, { toastId: "MQTTSError" });
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
            name="broker_ip"
            value={formik.values.broker_ip}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.broker_ip && Boolean(formik.errors.broker_ip)}
            helperText={formik.touched.broker_ip && formik.errors.broker_ip}
          />
        </Box>
        {/* <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="MQTTs Port"
            placeholder="MQTTs Port"
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
        </Box> */}

        <Box sx={{ width: "100%" }}>
          <OutlinedInput
            label="MQTTs Interval"
            placeholder="MQTTs Interval"
            type="number"
            name="data_interval"
            value={formik.values.data_interval}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.data_interval && Boolean(formik.errors.data_interval)
            }
            helperText={formik.touched.data_interval && formik.errors.data_interval}
          />
        </Box>

        <Box
          display="flex"
          sx={{ width: "100%", justifyContent: { xs: "center", sm: "space-around" }, flexDirection: { xs: "column", sm: "row" }, ".MuiFormControl-root ": { flex: 1 } }}
          alignItems="flex-end"
          flexWrap="wrap"
          gap={1}
        >
          <FormControlLabel
            control={
              <Checkbox
                name="root_ca"
                checked={formik.values.root_ca}
                onChange={formik.handleChange}
                sx={{ color: "#151515" }}
              />
            }
            label="CA1 cert"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="claim_cert"
                checked={formik.values.claim_cert}
                onChange={formik.handleChange}
                sx={{ color: "#151515" }}
              />
            }
            label="Claim cert"
          />

          <FormControlLabel
            control={
              <Checkbox
                name="claim_key"
                checked={formik.values.claim_key}
                onChange={formik.handleChange}
                sx={{ color: "#151515" }}
              />
            }
            label="Claim key"
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
