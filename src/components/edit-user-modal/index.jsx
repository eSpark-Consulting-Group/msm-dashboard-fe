import { Box } from "@mui/material";
import { useFormik } from "formik";
import { pencil } from "../../assets";
import Button from "../buttons";
import Dropdown from "../drop-down";
import OutlinedInput from "../input";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../services/users";
import { editUserSchema } from "../../schemas";

const EditUserModal = ({ user, handleCancel }) => {
  const [editUser, { isLoading }] = useUpdateUserMutation();

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone_number: user?.phone_number,
      customer_name: user?.customer_name,
      status:
        user?.status?.label === "Active" ? "active" : "inactive" || "inactive",
    },
    enableReinitialize: true,
    validationSchema: editUserSchema,
    onSubmit: (values) => {
      editUser({ id: user?._id, formData: values }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message || "Failed to update user");
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message || "User updated successfully");
          handleCancel();
        }
      });
    },
  });

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "25px",
        rowGap: "10px",
      }}
    >
      <OutlinedInput
        label={"User Name"}
        placeholder={"Enter User Name"}
        endAdornment={pencil}
        name={"name"}
        value={formik.values.name}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <OutlinedInput
        label={"Email"}
        placeholder={"Enter Email"}
        name={"email"}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <OutlinedInput
        label={"Phone No"}
        placeholder={"Enter Phone No"}
        endAdornment={pencil}
        name={"phone_number"}
        value={formik.values.phone_number}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.phone_number && Boolean(formik.errors.phone_number)
        }
        helperText={formik.touched.phone_number && formik.errors.phone_number}
      />

      <OutlinedInput
        label={"Customer Name"}
        placeholder={"Enter Customer Name"}
        endAdornment={pencil}
        name={"customer_name"}
        value={formik.values.customer_name}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.customer_name && Boolean(formik.errors.customer_name)
        }
        helperText={formik.touched.customer_name && formik.errors.customer_name}
      />

      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
        <Dropdown
          name="status"
          customLabel="Status"
          variant="filled"
          placeholder="Select Status"
          noLabel
          options={[
            { label: "Active", value: "active" },
            { label: "In active", value: "inactive" },
          ]}
          value={formik.values.status}
          handleChange={formik.handleChange}
          error={formik.touched.status && Boolean(formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
          renderValueSx={{
            color: formik.values.status === "active" ? "#35B21C" : "#EB1B1B",
            fontWeight: 600,
          }}
          selectSx={{
            backgroundColor:
              formik.values.status === "active" ? "#EFEFEF" : "#FDE8E8",
            border: "1.38px solid #DBD6D6",
            borderRadius: "6.92px",
            pt: "0px",
          }}
        />
      </Box>

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
          <Button
            disabled={isLoading}
            loading={isLoading}
            variant="contained"
            disableRipple
            type="submit"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditUserModal;
