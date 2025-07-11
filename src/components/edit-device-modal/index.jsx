import { Box, Menu, MenuItem, Typography } from "@mui/material";
import OutlinedInput from "../input";
import { DropDownIcon, pencil } from "../../assets";
import { useFormik } from "formik";
import { useState } from "react";
import Button from "../buttons";

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

const EditDeviceModal = ({ values, handleModalClose, handleCancel }) => {
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
    console.log(value);
    formik.setFieldValue("status", value);
    handleCloseMenu();
  };

  const formik = useFormik({
    initialValues: {
      deviceId: values?.deviceId || "",
      deviceName: values?.deviceName || "",
      label: values?.label || "",
      customerName: values?.customerName || "",
      group: values?.group || "",
      status: "Active",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
      handleModalClose();
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
        name={"deviceId"}
        value={formik.values.deviceId}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.deviceId && Boolean(formik.errors.deviceId)}
        helperText={formik.touched.deviceId && formik.errors.deviceId}
      />
      <OutlinedInput
        label={"Device Name"}
        placeholder={"Hello"}
        sx={sharedInputStyles}
        endAdornment={pencil}
        name={"deviceName"}
        value={formik.values.deviceName}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.deviceName && Boolean(formik.errors.deviceName)}
        helperText={formik.touched.deviceName && formik.errors.deviceName}
      />
      <OutlinedInput
        label={"Customer Name"}
        placeholder={"Hello"}
        sx={sharedInputStyles}
        endAdornment={pencil}
        name={"customerName"}
        value={formik.values.customerName}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.customerName && Boolean(formik.errors.customerName)
        }
        helperText={formik.touched.customerName && formik.errors.customerName}
      />
      <OutlinedInput
        label={"Group"}
        placeholder={"Hello"}
        sx={sharedInputStyles}
        endAdornment={pencil}
        name={"group"}
        value={formik.values.group}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.group && Boolean(formik.errors.group)}
        helperText={formik.touched.group && formik.errors.group}
      />
      <Box sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}>
        <Typography
          component="label"
          sx={{ fontSize: "14px", fontWeight: "400", color: "#454545" }}
        >
          Status
        </Typography>
        <Box
          sx={{
            backgroundColor: "#EFEFEF",
            border: "1.38px solid #DBD6D6",
            borderRadius: "8px",
            p: "12px 15px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          <Typography
            sx={{
              color: formik.values.status === "Active" ? "#35B21C" : "#EB1B1B",
              fontSize: "18px",
            }}
          >
            {formik.values.status}
          </Typography>
          <img src={DropDownIcon} alt="Icon" />
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
          <Button variant="outlined" disableRipple onClick={handleCancel}>
            Confirm
          </Button>
        </Box>
        <Box sx={{ width: "203.70px", height: "50px" }}>
          <Button variant="contained" disableRipple type="submit">
            Save
          </Button>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
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
          ?.filter((item) => item !== formik.values.status)
          .map((item, index) => (
            <MenuItem
              sx={{ width: "100%" }}
              key={index}
              onClick={() => handleOption(item)}
            >
              {item}
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default EditDeviceModal;
