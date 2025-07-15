import { Box, Menu, MenuItem, Typography } from "@mui/material";
import OutlinedInput from "../input";
import { DropDownIcon, pencil } from "../../assets";
import { useFormik } from "formik";
import { useState } from "react";
import Button from "../buttons";
import Dropdown from "../drop-down";
import { sharedInputStyles } from "../../theme";

 

const EditUserModal = ({ values, handleModalClose, handleCancel }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dropdownOptions = ["Active", "In active"];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOption = (value) => {
    formik.setFieldValue("status", value);
    handleCloseMenu();
  };

  const formik = useFormik({
    initialValues: {
      firstName: values?.userName?.name || "",
      lastName: values?.costumerName || "",
      email: values?.email || "",
      devices: values?.deviceId?.label || "",
      status: values?.status?.label || "Active",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("Updated User:", values);
      handleModalClose();
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
        label={"First Name"}
        placeholder={"Enter First Name"}
        sx={sharedInputStyles}
        endAdornment={pencil}
        name={"firstName"}
        value={formik.values.firstName}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />

      <OutlinedInput
        label={"Last Name"}
        placeholder={"Enter Last Name"}
        sx={sharedInputStyles}
        endAdornment={pencil}
        name={"lastName"}
        value={formik.values.lastName}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />

      <OutlinedInput
        label={"Email"}
        placeholder={"Enter Email"}
        sx={sharedInputStyles}
        endAdornment={pencil}
        name={"email"}
        value={formik.values.email}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <OutlinedInput
        label={"No. of Devices"}
        placeholder={"Enter Device Count"}
        sx={sharedInputStyles}
        endAdornment={pencil}
        name={"devices"}
        value={formik.values.devices}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.devices && Boolean(formik.errors.devices)}
        helperText={formik.touched.devices && formik.errors.devices}
      />

      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
        
        <Dropdown
          name="status"
          customLabel="Status"
          variant="filled"
          options={[
            { label: "Active", value: "Active" },
            { label: "In active", value: "In active" },
          ]}
          value={formik.values.status}
          handleChange={formik.handleChange}
          renderValueSx={{
            color: formik.values.status === "Active" ? "#35B21C" : "#EB1B1B",
            fontWeight: 600,
          }}
          selectSx={{
            backgroundColor:
              formik.values.status === "Active" ? "#EFEFEF" : "#FDE8E8",
            border: "1.38px solid #DBD6D6",
            borderRadius: "6.92px",
          }}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            mt: 1,
            px: 1,
            minWidth: "150px",
          },
        }}
      >
        {dropdownOptions
          .filter((item) => item !== formik.values.status)
          .map((item, index) => (
            <MenuItem key={index} onClick={() => handleOption(item)}>
              {item}
            </MenuItem>
          ))}
      </Menu>

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
          <Button variant="contained" disableRipple type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditUserModal;
