import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { pencil } from "../../assets";
import OutlinedInput from "../input";
import Button from "../buttons";
import { useUpdateGroupMutation } from "../../services/groups";

const sharedInputStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#EFEFEF",
    borderRadius: "6.92px",
    height: "55px",
    color: "#000000",
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "#000000",
    opacity: 1,
  },
};

const EditGroupModal = ({ data, handleCancel }) => {
  const [updateGroup, { isLoading }] = useUpdateGroupMutation();

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      description: data?.description || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      updateGroup({ id: data?._id, formData: values })
        .then((res) => {
          if (res?.error) {
            toast.error(res?.error?.data?.message || "Failed to update group");
            return;
          }
          if (res?.data) {
            toast.success(res?.data?.message || "Group updated successfully");
            handleCancel()
          }
        })
    },
  });
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "25px",
        rowGap: "10px",
      }}
      component={"form"}
      onSubmit={formik.handleSubmit}
    >
      <OutlinedInput
        label={"Device ID"}
        placeholder={"Hello"}
        sx={sharedInputStyles}
        endAdornment={pencil}
        name={"name"}
        value={formik.values.name}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <OutlinedInput
        label={"Description"}
        placeholder={"Enter description"}
        type={"text"}
        multiline
        sx={{
          height: "100%",
          width: "100%",
          "& .MuiOutlinedInput-root": {
            border: "none !important",
            height: "100%",
            backgroundColor: "#EFEFEF",
            borderRadius: "6.92px",
            p: "15px",
            minHeight: "150px",
            alignItems: "flex-start",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none !important",
          },
        }}
        name={"description"}
        value={formik.values.description}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
        endAdornment={pencil}
      />
      <Box
        sx={{
          mt: "30px",
          display: "flex",
          justifyContent: "flex-end",
          columnGap: "20px",
        }}
      >
        <Box sx={{ width: "203.70px", height: "50px" }}>
          <Button variant="outlined" disableRipple onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
        <Box sx={{ width: "203.70px", height: "50px" }}>
          <Button disabled={isLoading} loading={isLoading} variant="contained" disableRipple type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditGroupModal;
