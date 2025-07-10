import { Box, Typography } from "@mui/material";
import OutlinedInput from "../input";
import { useFormik } from "formik";

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

const fields = [
  { name: "name", label: "Name", placeholder: "Enter Name" },
  { name: "label", label: "Label", placeholder: "Description" },
  {
    name: "deviceProfile",
    label: "Device Profile",
    placeholder: "Device profile",
  },
  { name: "description", label: "Description", placeholder: "Description" },
  { name: "owners", label: "Owner", placeholder: "Owners" },
  { name: "groups", label: "Groups", placeholder: "Groups" },
];

const credentials = [
  { name: "accessToken", label: "Access Token", placeholder: "Owners" },
  { name: "x509", label: "X.509", placeholder: "Certificate in PEM format" },
  { name: "clientId", label: "MQTT Client ID", placeholder: "ID" },
  { name: "user", label: "MQTT User", placeholder: "" },
  {
    name: "password",
    label: "MQTT Password",
    placeholder: "Password",
    type: "password",
  },
];

const AddDeviceModal = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      label: "",
      deviceProfile: "",
      description: "",
      owners: "",
      groups: "",
      password: "",
      user: "",
      clientId: "",
      x509: "",
      accessToken: "",
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

      <Box sx={{ width: "100%" }}>
        <Typography sx={{ fontSize: "18.43px", fontWeight: "700" }}>
          Device Credentials
        </Typography>
      </Box>

      {credentials.map(renderInput)}
    </Box>
  );
};

export default AddDeviceModal;
