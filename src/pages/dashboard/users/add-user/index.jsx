import { Box, Typography } from "@mui/material";
import {
  addOption,
  deleteOption,
  dummyUser,
  uploadIcon,
} from "../../../../assets";
import Button from "../../../../components/buttons";
import {
  CustomAutoComplete,
  Dropdown,
  OutlinedInput,
  SubHeader,
} from "../../../../components";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { generalScehma, passwordScehma } from "../../../../schemas";

const AddUser = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const generalFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
    },
    validationSchema: generalScehma,
    onSubmit: (values) => {
      generalFormik.setFieldValue("isConfirmed", true);
      console.log(values);
    },
  });

  const passwordFormik = useFormik({
    initialValues: {
      password: "",
      conPassword: "",
    },
    validationSchema: passwordScehma,
    onSubmit: (values) => {
      console.log(values);
      passwordFormik.setFieldValue("isConfirmed", true);
    },
  });

  const devicesFormik = useFormik({
    initialValues: {
      devices: [
        {
          id: uuidv4(),
          device: "",
          access: "",
          isConfirmed: false,
          touched: { device: false, access: false },
          errors: { device: "", access: "" },
        },
        {
          id: uuidv4(),
          device: "",
          access: "",
          isConfirmed: false,
          touched: { device: false, access: false },
          errors: { device: "", access: "" },
        },
      ],
    },
    onSubmit: () => {},
  });

  const [profileFile, setProfileFile] = useState(null);

  const handleProfileChange = (e) => setProfileFile(e.target.files[0]);
  const handleUpload = () => inputRef.current.click();

  const HandleAddSet = () => {
    devicesFormik.setFieldValue("devices", [
      ...devicesFormik.values.devices,
      {
        id: uuidv4(),
        device: "",
        access: "",
        isConfirmed: false,
        touched: { device: false, access: false },
        errors: { device: "", access: "" },
      },
    ]);
  };

  const HandleRemoveSet = (id) => {
    devicesFormik.setFieldValue(
      "devices",
      devicesFormik.values.devices.filter((item) => item.id !== id)
    );
  };

  const hanleConfirmDevice = (id) => {
    const updatedDevices = devicesFormik.values.devices.map((device) => {
      if (device.id === id) {
        const errors = {
          device: !device.device ? "Device is required" : "",
          access: !device.access ? "Access level is required" : "",
        };

        const touched = {
          device: true,
          access: true,
        };

        if (errors.device || errors.access) {
          return {
            ...device,
            errors,
            touched,
          };
        }

        return {
          ...device,
          isConfirmed: !device.isConfirmed,
          errors: { device: "", access: "" },
        };
      }
      return device;
    });

    devicesFormik.setFieldValue("devices", updatedDevices);
  };

  const handleDeviceChange = (id, field, value) => {
    const updatedDevices = devicesFormik.values.devices.map((device) => {
      if (device.id === id) {
        return {
          ...device,
          [field]: value,
          touched: { ...device.touched, [field]: true },
          errors: {
            ...device.errors,
            [field]: !value
              ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
              : "",
          },
        };
      }
      return device;
    });

    devicesFormik.setFieldValue("devices", updatedDevices);
  };

  useEffect(() => {
    if (!profileFile) return;
    const objectUrl = URL.createObjectURL(profileFile);
    return () => URL.revokeObjectURL(objectUrl);
  }, [profileFile]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
      <SubHeader
        heading={"Add User"}
        subHeading={"Here's what's happening with your device and users"}
        buttonText={"Go Back"}
        onClick={() => navigate("/users")}
      />
      <Box sx={{ px: { xs: "5px", md: "10px", lg: "20px" } }}>
        <Typography sx={{ color: "#454545", fontSize: "16px" }}>
          Profile Picture
        </Typography>
        <Box
          sx={{
            display: "flex",
            columnGap: "15px",
            mt: "30px",
            alignItems: "center",
          }}
        >
          {profileFile ? (
            <img
              src={URL.createObjectURL(profileFile)}
              style={{ borderRadius: "50%", height: "50px", width: "50px" }}
            />
          ) : (
            <Box
              sx={{
                backgroundColor: "#F8F8F8",
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={dummyUser}
                alt="Icon"
                width={"26.5px"}
                height={"26.5px"}
              />
            </Box>
          )}
          <Box sx={{ width: "190px" }}>
            <Button
              variant="contained"
              sx={{
                fontSize: "16px",
                height: "45px",
                backgroundColor: "#0C89E2",
                display: "flex",
                columnGap: "10px",
                "&:hover": {
                  background: "#0C89E2",
                  boxShadow: "none",
                  border: "none",
                },
                borderRadius: "5px",
              }}
              disableRipple
              onClick={handleUpload}
            >
              <img src={uploadIcon} alt="Icon" /> Upload Picture
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            mt: "30px",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
          }}
        >
          <Typography sx={{ color: "#454545", fontSize: "16px" }}>
            General
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: { xs: "100%", lg: "790px", xl: "65%" },
              flexDirection: { xs: "column", lg: "row" },
              columnGap: "30px",
              rowGap: "15px",
            }}
          >
            <Box sx={{ width: { xs: "100%", lg: "300px" }, height: "98px" }}>
              <OutlinedInput
                label="Username"
                name="username"
                placeholder="Enter user full name"
                type="text"
                value={generalFormik.values.username}
                onInputChange={generalFormik.handleChange}
                error={
                  generalFormik.touched.username &&
                  !!generalFormik.errors.username
                }
                helperText={
                  generalFormik.touched.username &&
                  generalFormik.errors.username
                }
                onBlur={generalFormik.handleBlur}
                readOnly={generalFormik.values.isConfirmed}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "300px" }, height: "98px" }}>
              <OutlinedInput
                label="Email"
                name="email"
                placeholder="Enter email"
                type="text"
                value={generalFormik.values.email}
                onInputChange={generalFormik.handleChange}
                onBlur={generalFormik.handleBlur}
                error={
                  generalFormik.touched.email &&
                  Boolean(generalFormik.errors.email)
                }
                helperText={
                  generalFormik.touched.email && generalFormik.errors.email
                }
                readOnly={generalFormik.values.isConfirmed}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", lg: "120px" },
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#888888",
                  height: "40px",
                  color: "white",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  if (generalFormik.values.isConfirmed) {
                    generalFormik.setFieldValue("isConfirmed", false);
                  } else {
                    generalFormik.handleSubmit();
                  }
                }}
              >
                {generalFormik.values.isConfirmed ? "Edit" : "Confirm"}
              </Button>
            </Box>
            <Box
              sx={{
                width: "40px",
                height: "40px",
                display: { xs: "none", lg: "block" },
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            mt: "30px",
            display: "flex",
            flexDirection: "column",
            rowGap: "10px",
          }}
        >
          <Typography sx={{ color: "#454545", fontSize: "16px" }}>
            Set User Password
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: { xs: "100%", lg: "790px", xl: "65%" },
              flexDirection: { xs: "column", lg: "row" },
              columnGap: "30px",
              rowGap: "15px",
            }}
          >
            <Box sx={{ width: { xs: "100%", lg: "300px" }, height: "98px" }}>
              <OutlinedInput
                label="Set Password"
                name="password"
                placeholder="Enter password"
                type="password"
                value={passwordFormik.values.password}
                onInputChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                error={
                  passwordFormik.touched.password &&
                  Boolean(passwordFormik.errors.password)
                }
                helperText={
                  passwordFormik.touched.password &&
                  passwordFormik.errors.password
                }
                readOnly={passwordFormik.values.isConfirmed}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "300px" }, height: "98px" }}>
              <OutlinedInput
                label="Confirm New Password"
                name="conPassword"
                placeholder="Enter password"
                type="password"
                value={passwordFormik.values.conPassword}
                onInputChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                error={
                  passwordFormik.touched.conPassword &&
                  Boolean(passwordFormik.errors.conPassword)
                }
                helperText={
                  passwordFormik.touched.conPassword &&
                  passwordFormik.errors.conPassword
                }
                readOnly={passwordFormik.values.isConfirmed}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "100%", lg: "120px" },
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#888888",
                  height: "40px",
                  color: "white",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  if (passwordFormik.values.isConfirmed) {
                    passwordFormik.setFieldValue("isConfirmed", false);
                  } else {
                    passwordFormik.handleSubmit();
                  }
                }}
              >
                {passwordFormik.values.isConfirmed ? "Edit" : "Confirm"}
              </Button>
            </Box>
            <Box
              sx={{
                width: "40px",
                height: "40px",
                display: { xs: "none", lg: "block" },
              }}
            />
          </Box>
        </Box>

        <Typography sx={{ color: "#454545", fontSize: "16px", mt: "30px" }}>
          Device
        </Typography>
        {devicesFormik.values.devices.map((item, index) => (
          <Box
            key={index}
            sx={{
              mt: index ? "30px" : "10px",
              display: "flex",
              rowGap: "15px",
              columnGap: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: { xs: "100%", lg: "790px", xl: "65%" },
                flexDirection: { xs: "column", lg: "row" },
                columnGap: "30px",
              }}
            >
              {["device", "access"].map((field) => (
                <Box
                  key={field}
                  sx={{
                    width: { xs: "100%", lg: "300px" },
                    height: "98px",
                  }}
                >
                  {item.isConfirmed ? (
                    <OutlinedInput
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      name={field}
                      value={item[field]}
                      readOnly
                    />
                  ) : (
                    <>
                      <CustomAutoComplete
                        options={[
                          { label: "Ten", value: "ten" },
                          { label: "Twenty", value: "twenty" },
                        ]}
                        value={item[field]}
                        name={field}
                        placeholder={
                          field === "device"
                            ? "Select or enter device"
                            : "Select access level"
                        }
                        onChange={(event, newValue) => {
                          const selectedValue =
                            typeof newValue === "string"
                              ? newValue
                              : newValue?.value || "";
                          handleDeviceChange(item.id, field, selectedValue);
                        }}
                        customLabel={
                          field.charAt(0).toUpperCase() + field.slice(1)
                        }
                        freeSolo={true}
                        error={
                          item.touched[field] && Boolean(item.errors[field])
                        }
                      />
                      {item.touched[field] && item.errors[field] && (
                        <Typography
                          variant="caption"
                          color="red"
                          sx={{ mt: 1, display: "block" }}
                        >
                          {item.errors[field]}
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              ))}
              <Box
                sx={{
                  width: { xs: "100%", lg: "120px" },
                }}
              >
                <Button
                  sx={{
                    backgroundColor: "#888888",
                    height: "40px",
                    color: "white",
                    borderRadius: "5px",
                  }}
                  onClick={() => hanleConfirmDevice(item.id)}
                >
                  {item.isConfirmed ? "Edit" : "Confirm"}
                </Button>
              </Box>
              {index === devicesFormik.values.devices.length - 1 ? (
                <Box sx={{ mt: { xs: "10px", lg: "0px" } }}>
                  <img
                    src={addOption}
                    alt="Add"
                    style={{
                      cursor: "pointer",
                      width: "40px",
                      height: "40px",
                    }}
                    onClick={HandleAddSet}
                  />
                </Box>
              ) : item.isConfirmed &&
                devicesFormik.values.devices?.length > 1 ? (
                <Box sx={{ mt: { xs: "10px", lg: "0px" } }}>
                  <img
                    src={deleteOption}
                    alt="Delete"
                    style={{
                      cursor: "pointer",
                      width: "40px",
                      height: "40px",
                    }}
                    onClick={() => HandleRemoveSet(item.id)}
                  />
                </Box>
              ) : (
                <Box sx={{ width: "40px", height: "40px" }} />
              )}
            </Box>
          </Box>
        ))}
      </Box>
      <input
        type="file"
        ref={inputRef}
        onChange={handleProfileChange}
        accept=".jpeg, .jpg, .tiff, .png, .webp"
        style={{ display: "none" }}
      />
    </Box>
  );
};

export default AddUser;
