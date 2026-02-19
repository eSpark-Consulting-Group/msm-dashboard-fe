import { useFormik } from "formik";
import { Box, Typography, Switch, FormControlLabel, Grid } from "@mui/material";
import OutlinedInput from "../input";
import Button from "../buttons";
import { toast } from "react-toastify";
import { editConfigurationSettingsSchema } from "../../schemas";
import { useUpdateConfigurationMutation } from "../../services/configration";
import { useParams } from "react-router-dom";
import { DEVICE_CONFIGURATION_FIELDS } from "../../constant";

const ConfigurationEditModal = ({ data, handleCancel }) => {
  const { id } = useParams();
  const [updateConfiguration, { isLoading }] = useUpdateConfigurationMutation();

  const formattedData = Array?.isArray(data)
    ? data.reduce((acc, item) => {
        Object.keys(item).forEach((key) => {
          if (key !== "name") {
            acc[`${item.name}_${key}`] = item[key];
          }
        });
        return acc;
      }, {})
    : {};

  const initialValues = DEVICE_CONFIGURATION_FIELDS?.reduce((acc, group) => {
    group.fields.forEach((field) => {
      acc[field.key] = formattedData?.[field.key] ?? field.value ?? "";
    });
    return acc;
  }, {});

  // 🔹 Step 3: Formik setup
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: editConfigurationSettingsSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const res = await updateConfiguration({ formData: values, id });
        if (res?.data) {
          toast.success("Device Configuration updated successfully");
          handleCancel();
        }
        if (res?.error) {
          toast.error(res?.error?.data?.message, {
            toastId: "CONFIGURATION_ERROR",
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
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "25px",
          mt: "10px",
        }}
      >
        <Grid container gap={1} p={1.5}>
          {DEVICE_CONFIGURATION_FIELDS.map((group) => (
            <Box key={group.title} sx={{ width: "100%", mb: 1.5 }}>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ mb: 1.5, color: "#048EF1", fontSize: "16px" }}
              >
                {group.title}
              </Typography>

              {group.fields.map((field) => (
                <Grid item xs={12} key={field.key} pb={1}>
                  {field.type === "switch" ? (
                    <FormControlLabel
                      control={
                        <Switch
                          name={field.key}
                          checked={formik.values[field.key]}
                          onChange={formik.handleChange}
                          sx={{
                            "& .MuiSwitch-switchBase": {
                              color: "#004799",
                              "&.Mui-checked": {
                                color: "#004799",
                                "& + .MuiSwitch-track": {
                                  backgroundColor: "#048EF1",
                                  opacity: 1,
                                },
                              },
                            },
                            "& .MuiSwitch-track": {
                              backgroundColor: "#004799",
                            },
                          }}
                        />
                      }
                      label={field.label}
                    />
                  ) : (
                    <OutlinedInput
                      type="number"
                      name={field.key}
                      label={field.label}
                      placeholder="Enter number"
                      value={formik.values[field.key]}
                      onInputChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.submitCount > 0 &&
                        Boolean(formik.errors[field.key])
                      }
                      helperText={
                        formik.submitCount > 0 && formik.errors[field.key]
                      }
                      sx={{
                        "& input[type=number]": { MozAppearance: "textfield" },
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
                  )}
                </Grid>
              ))}
            </Box>
          ))}
        </Grid>

        <Box
          sx={{
            mt: "30px",
            display: "flex",
            justifyContent: "flex-end",
            columnGap: "20px",
            width: "100%",
          }}
        >
          <Box sx={{ width: 204, height: 50 }}>
            <Button variant="outlined" disableRipple onClick={handleCancel}>
              Cancel
            </Button>
          </Box>

          <Box sx={{ width: 204, height: 50 }}>
            <Button
              type="submit"
              variant="contained"
              disableRipple
              loading={isLoading}
              disabled={isLoading}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ConfigurationEditModal;
