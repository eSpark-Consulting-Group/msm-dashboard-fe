import { Box, Grid } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import OutlinedInput from "../input";
import Button from "../buttons";
import {
  useUpdateCtRatioMutation,
  useUpdateIoffSetMutation,
  useUpdateVoffSetMutation,
} from "../../services/measurements";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const sharedInputStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#EFEFEF",
    borderRadius: "6.92px",
    height: "55px",
    color: "#000",
    border: "1.28px solid #DBD6D6",
    fontSize: "16px",
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "#A1A1AA",
    opacity: 1,
    fontSize: "16px",
  },
};

const EditMeasurementModal = ({ type, editData, handleClose }) => {
  const initialValues = {};
  Object.keys(editData || {}).forEach((key) => {
    initialValues[key.replace("-", "")] = editData[key];
  });

  const [ctRatio] = useUpdateCtRatioMutation();
  const [voffSet] = useUpdateVoffSetMutation();
  const [ioffSet] = useUpdateIoffSetMutation();

  const { id } = useParams();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {};
        Object.keys(values).forEach((key) => {
          const newKey = key.replace(/(\d+)/, "-$1");
          payload[newKey] = Number(values[key]);
        });

        let response;
        if (type === "set-ct-ratio") {
          response = await ctRatio({ formData: payload, id }).unwrap();
        } else if (type === "set-v-offset") {
          response = await voffSet({ formData: payload, id }).unwrap();
        } else if (type === "set-i-offset") {
          response = await ioffSet({ formData: payload, id }).unwrap();
        }

        toast.success("Update successful!");
      } catch (error) {
        console.error("API Error:", error);
        toast.error("Failed to update. Please try again.");
      } finally {
        handleClose();
        setSubmitting(false);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} sx={{ width: "100%", marginTop: "15px" }}>
        {Object.keys(editData || {})
          .sort((a, b) => Number(a.split("-")[1]) - Number(b.split("-")[1]))
          .map((key) => {
            const fieldName = key.replace("-", "");
            const label = key[0].toUpperCase() + key.slice(1).replace("-", " ");
            return (
              <Grid
                item
                size={{ xs: 12, md: 6, lg: 4 }}
                key={key}
                sx={{ marginBottom: "10px" }}
              >
                <OutlinedInput
                  label={label}
                  placeholder={label}
                  type="number"
                  sx={sharedInputStyles}
                  name={fieldName}
                  value={formik.values[fieldName]}
                  onInputChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[fieldName] &&
                    Boolean(formik.errors[fieldName])
                  }
                  helperText={
                    formik.touched[fieldName] && formik.errors[fieldName]
                  }
                />
              </Grid>
            );
          })}
      </Grid>
      <Box mt={2}>
        <Button
          variant="contained"
          disableRipple
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Updating..." : "Update"}
        </Button>
      </Box>
    </Box>
  );
};

export default EditMeasurementModal;
