import { Box } from "@mui/material";
import OutlinedInput from "../input";
import { useFormik } from "formik";
import { sharedInputStyles } from "../../theme";

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

const AddUserModal = () => {
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
    },
  });

  const renderInput = ({ name, label, placeholder, type }) => (
    <Box key={name} sx={{ width: { xs: "100%", md: "46%", lg: "47%" } }}>
      <OutlinedInput
        label={label}
        placeholder={placeholder}
        type={type || "text"}
        sx={sharedInputStyles}
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
    </Box>
  );
};

export default AddUserModal;
