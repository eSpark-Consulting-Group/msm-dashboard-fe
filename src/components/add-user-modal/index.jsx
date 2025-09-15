import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useFormik } from "formik";
import OutlinedInput from "../input";
import Button from "../buttons";
import Dropdown from "../drop-down";
import { useGetAllRolesQuery } from "../../services/roles";
import { useCreateUserMutation } from "../../services/users";
import { userSchema } from "../../schemas";

const fields = [
  { name: "name", label: "User name", placeholder: "Enter User Name" },
  { name: "label", label: "Label", placeholder: "Label" },
  { name: "email", label: "Email", placeholder: "Enter Email" },
  { name: "password", label: "Password", placeholder: "Enter Password" },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter Phone Number",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter Description",
  },
  { name: "method", label: "Method", placeholder: "Enter Method" },
  { name: "owners", label: "Owner", placeholder: "Enter Owner Name" },
  {
    name: "customerName",
    label: "Customer Name",
    placeholder: "Enter Customer Name",
  },
];

const AddUserModal = ({ onCancel }) => {
  const [roleOptions, setRoleOptions] = useState([]);

  const {
    data: rolesData,
    isLoading: rolesLoading,
    error: rolesError,
  } = useGetAllRolesQuery();

  useEffect(() => {
    if (rolesData?.data) {
      const options = rolesData.data.map((role) => ({
        label: role.name,
        value: role._id,
      }));
      setRoleOptions(options);
    }
  }, [rolesData]);

  useEffect(() => {
    if (rolesError) {
      toast.error(rolesError?.data?.message || "Failed to fetch roles")
    }
  }, [rolesError])

  const [createUser, { isLoading }] = useCreateUserMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      label: "",
      email: "",
      password: "",
      phoneNumber: "",
      description: "",
      method: "",
      owners: "",
      customerName: "",
      role: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      const bodyToSend = {
        name: values?.name,
        label: values?.label,
        email: values?.email,
        password: values?.password,
        phone_number: values?.phoneNumber,
        description: values?.description,
        method: values?.method,
        owner: values?.owners,
        customer_name: values?.customerName,
        role_id: values?.role,
        status: "active"
      }
      createUser(bodyToSend)
        .then((res) => {
          if (res?.error) {
            toast.error(res?.error?.data?.message || "Failed to create user");
            return;
          }
          if (res?.data) {
            toast.success(res?.data?.message || "User created successfully");
            onCancel()
          }
        })
    }
  });

  const renderInput = ({ name, label, placeholder, type }) => (
    <Box key={name} sx={{ width: { xs: "100%", md: "46%", lg: "47%" } }}>
      <OutlinedInput
        label={label}
        placeholder={placeholder}
        type={type || "text"}
        name={name}
        value={formik.values[name]}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
      />
    </Box>
  );

  if (rolesLoading) {
    return <Stack justifyContent="center" alignItems="center" ><CircularProgress /></Stack>
  }

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "25px",
          rowGap: "17px",
          mt: "15px",
        }}
      >
        {fields.map(renderInput)}

        <Box sx={{ width: { xs: "100%", md: "46%", lg: "47%" } }}>
          <Dropdown
            name="role"
            customLabel="Role"
            variant="outlined"
            placeholder="Select Role"
            noLabel
            options={roleOptions}
            value={formik.values.role}
            handleChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
            renderValueSx={{
              color: "#000",
              fontWeight: 400,
            }}
            selectSx={{
              backgroundColor: "#FFF",
              border: "1.38px solid #DBD6D6",
              borderRadius: "6.92px",
              height: "56px",
            }}
          />
        </Box>
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
          <Button variant="outlined" disableRipple onClick={onCancel}>
            Cancel
          </Button>
        </Box>
        <Box sx={{ width: "203.70px", height: "50px" }}>
          <Button
            variant="contained"
            disableRipple
            type="submit"
            disabled={isLoading}
            loading={isLoading}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddUserModal;
