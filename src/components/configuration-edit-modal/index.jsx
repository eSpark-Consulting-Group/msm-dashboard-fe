import { useFormik } from "formik";
import { Box, Typography } from "@mui/material";
import OutlinedInput from "../input";
import Button from "../buttons";
import { toast } from "react-toastify";
import { editConfigurationSettingsSchema } from "../../schemas";
import { useUpdateConfigurationMutation } from "../../services/configration";
import { useParams } from "react-router-dom";

const ConfigrationEditModal = ({ data, handleCancel }) => {
  const { id } = useParams();
  const [updateConfiguration, { isLoading }] = useUpdateConfigurationMutation();
  
  const formik = useFormik({
    initialValues: {
      voltage_unbalance: data?.voltage_unbalance ?? "",
    },
    validationSchema: editConfigurationSettingsSchema,
    onSubmit: async (values) => {
      try {
        const obj = {
          voltage_unbalance: values?.voltage_unbalance,
        };
        const res = await updateConfiguration({
          formData: obj,
          id: id,
        });
        if (res?.data) {
          toast.success("Device Configuration updated successfully");
          handleCancel();
        }
        if (res?.error) {
          toast?.error(res?.error?.data?.message, {
            toastId: "CONFIGRATIONError",
          });
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
        Device Configuration
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
            label="Voltage Unbalance"
            placeholder="Voltage unbalance"
            type="number"
            name="voltage_unbalance"
            value={formik.values.voltage_unbalance}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.voltage_unbalance &&
              Boolean(formik.errors.voltage_unbalance)
            }
            helperText={
              formik.touched.voltage_unbalance &&
              formik.errors.voltage_unbalance
            }
            sx={{
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
              "& input[type=number]::-webkit-outer-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
            }}
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

export default ConfigrationEditModal;
