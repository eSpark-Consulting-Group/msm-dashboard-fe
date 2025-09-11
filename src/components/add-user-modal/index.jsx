import { Box, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import OutlinedInput from "../input";
import Button from "../buttons";
import Dropdown from "../drop-down";
import { useGetAllRolesQuery } from "../../services/roles";

const fields = [
  { name: "name", label: "Name", placeholder: "Enter Name" },
  { name: "label", label: "Label", placeholder: "Label" },
  { name: "email", label: "Email", placeholder: "Enter Email" },
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
  { name: "groups", label: "Groups", placeholder: "Enter Groups" },
  {
    name: "customerName",
    label: "Customer Name",
    placeholder: "Enter Customer Name",
  },
];

const AddUserModal = ({ onSubmit, onCancel }) => {
  const [roleOptions, setRoleOptions] = useState([]);

  // Fetch roles from API
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

  const formik = useFormik({
    initialValues: {
      name: "",
      label: "",
      email: "",
      phoneNumber: "",
      description: "",
      method: "",
      owners: "",
      groups: "",
      customerName: "",
      role: "", 
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
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
            options={roleOptions}
            value={formik.values.role}
            handleChange={formik.handleChange}
            loading={rolesLoading}
            error={rolesError}
            helperText={rolesError ? "Failed to load roles" : ""}
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
            disabled={rolesLoading} 
          >
            {rolesLoading ? "Loading..." : "Add User"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddUserModal;
