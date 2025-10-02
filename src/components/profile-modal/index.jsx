import {
  Avatar,
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { edit, pencilWhite, uploadIcon2, userAvatar } from "../../assets";
import OutlinedInput from "../input";
import { useFormik } from "formik";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { profileSchema } from "../../schemas";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useUpdateUserMutation } from "../../services/users";
import ChangePassword from "../change-password";
import { handleProfileUpdate } from "../../store/slices/auth";

const sharedInputStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#FFFFFF",
    borderRadius: "15px",
    height: "50px",
    color: "#000",
    border: "1.28px solid #DFEAF2",
    fontSize: "16px",
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "#A1A1AA",
    opacity: 1,
    fontSize: "16px",
  },
};

const items = [
  { name: "name", label: "User Name", placeholder: "" },
  // { name: "userName", label: "User Name", placeholder: "" },
  { type: "date" },
  { name: "companyName", label: "Company Name", placeholder: "" },
  { name: "companyMail", label: "Company Mail", placeholder: "" },
  { name: "phone", label: "Phone Number", placeholder: "" },
];

const ProfileModal = ({ handleClose }) => {
  const { user } = useSelector((state) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (event, newValue) => setTabIndex(newValue);
  const imageRef = useRef(null);
  const logoRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(
    `${import.meta.env.VITE_IMAGE_BASE_URL}${user?.profile_image}`
  );
  const [previewUrl2, setPreviewUrl2] = useState(
    `${import.meta.env.VITE_IMAGE_BASE_URL}${user?.logo}`
  );

  const [isEditAble, setIsEditAble] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      // userName: user?.,
      dob: dayjs(user?.date_of_birth) || null,
      companyName: user?.company_name || "",
      companyMail: user?.company_mail || "",
      phone: user?.phone_number || "",
      // logo: user?.logo || null,
      profileImg: user?.profile_image || null,
    },
    validationSchema: profileSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const formData = new FormData();
      if (values?.name) formData.append("name", values?.name);
      if (values?.dob) formData.append("date_of_birth", values?.dob);
      if (values?.companyName)
        formData.append("company_name", values?.companyName);
      if (values?.companyMail)
        formData.append("company_mail", values?.companyMail);
      if (values?.phone) formData.append("phone_number", values?.phone);
      // if (values?.logo && typeof values?.logo !== "string")
      //   formData.append("logo", values?.logo);
      if (values?.profileImg && typeof values?.profileImg !== "string")
        formData.append("profile_image", values?.profileImg);
      updateUser({ id: user?._id, formData }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message || "Failed to update profile");
          setIsEditAble(false);
          return;
        }
        if (res?.data) {
          toast.success("Profile updated successfully");
          // console.log(res?.data);
          dispatch(handleProfileUpdate(res?.data?.data));
          setIsEditAble(false);
          handleClose();
        }
      });
    },
  });

  const renderInput = ({ name, label, placeholder }) => (
    <Grid size={{ xs: 12, md: 6 }} key={name}>
      <OutlinedInput
        label={label}
        placeholder={placeholder}
        type={"text"}
        sx={sharedInputStyles}
        name={name}
        value={formik.values[name]}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        labelStyle={{ color: "#232323", fontSize: "16px", fontWeight: "600" }}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        readOnly={!isEditAble}
        // modal={true}
      />
    </Grid>
  );

  const handleFileChange = (event, type) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue(type === "profile" ? "profileImg" : "logo", file);

      const reader = new FileReader();
      reader.onloadend = () => {
        type === "profile"
          ? setPreviewUrl(reader.result)
          : setPreviewUrl2(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ borderBottom: "2px solid #F4F5F7" }}
        TabIndicatorProps={{
          style: { backgroundColor: "#007BFF", height: "3px" },
        }}
      >
        <Tab
          label="Profile"
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            color: tabIndex === 0 ? "#0077FF !important" : "black",
            textTransform: "capitalize",
          }}
        />
        <Tab
          label="Password"
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            color: tabIndex === 1 ? "#0077FF !important" : "black",
            textTransform: "capitalize",
          }}
        />
      </Tabs>
      {tabIndex === 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              gap: "35px",
              justifyContent: "flex-start",
              mt: "30px",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ width: "132px", height: "130px", position: "relative" }}>
              <Avatar
                sx={{ width: "100%", height: "100%" }}
                alt="User"
                src={previewUrl}
              />
              {isEditAble && (
                <Box
                  sx={{
                    backgroundColor: "#1814F3",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    right: "0px",
                    width: "30px",
                    height: "30px",
                    bottom: "15px",
                    cursor: "pointer",
                  }}
                  onClick={() => imageRef.current.click()}
                >
                  <img src={pencilWhite} alt="" />
                </Box>
              )}
            </Box>
            <Grid
              sx={{ flex: 1 }}
              component={"form"}
              container
              spacing={5}
              rowGap={2.5}
              onSubmit={formik.handleSubmit}
            >
              {items?.map((item, index) =>
                item?.type === "date" ? (
                  <Grid
                    key={index}
                    size={{ xs: 12, md: 6 }}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "8px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#232323",
                      }}
                    >
                      Date of Birth
                    </Typography>
                    <DatePicker
                      name="dob"
                      value={formik.values.dob}
                      onChange={(value) => formik.setFieldValue("dob", value)}
                      disableFuture
                      slotProps={{
                        textField: {
                          error: Boolean(
                            formik.touched.dob && formik.errors.dob
                          ),
                          helperText: formik.touched.dob && formik.errors.dob,
                          sx: {
                            "& .MuiPickersInputBase-root.MuiPickersOutlinedInput-root":
                              {
                                borderRadius: "15px",
                                height: "50px",
                                border: "1.28px solid #DFEAF2",
                                // border: "1.28px solid #ff0000ff",
                              },
                            ".MuiPickersOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline, &.Mui-focused .MuiPickersOutlinedInput-notchedOutline":
                              {
                                border: "none",
                              },
                            "&.Mui-error .MuiOutlinedInput-notchedOutline, &.Mui-error .MuiPickersOutlinedInput-notchedOutline":
                              {
                                borderColor: "#DFEAF2",
                              },
                          },
                        },
                      }}
                      readOnly={!isEditAble}
                    />
                  </Grid>
                ) : (
                  renderInput(item)
                )
              )}
              {/* <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ display: "flex", flexDirection: "column", rowGap: "8px" }}
          >
            <Typography
              sx={{ color: "#232323", fontSize: "16px", fontWeight: "600" }}
            >
              Logo
            </Typography>
            <Box
              sx={{
                width: "100%",
                border: "1px solid #DFEAF2",
                borderRadius: "15px",
                height: "120.22px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => logoRef.current.click()}
            >
              {previewUrl2 ? (
                <Avatar
                  src={previewUrl2}
                  alt="Logo"
                  sx={{ width: "72px", height: "72px" }}
                />
              ) : (
                <img src={uploadIcon2} alt="Icon" />
              )}
            </Box>
            {formik.submitCount > 0 && !formik.values.logo && (
              <Typography sx={{ fontSize: "0.75rem", color: "red" }}>
                Please select a logo
              </Typography>
            )}
          </Grid> */}
              <Grid
                size={{ xs: 12 }}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "190px", height: "50px", mr: "5px" }}>
                  {isEditAble && (
                    <Button
                      loading={isLoading}
                      disabled={isLoading}
                      variant="blue2"
                      type="submit"
                      disableRipple
                    >
                      Update
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box sx={{ width: "190px", height: "50px", mr: "5px" }}>
              {!isEditAble && (
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => setIsEditAble(true)}
                >
                  Edit
                </Button>
              )}
            </Box>
          </Box>
        </>
      ) : (
        <ChangePassword handleClose={handleClose} />
      )}
      <input
        type="file"
        name="userImage"
        style={{ display: "none" }}
        ref={imageRef}
        onChange={(e) => handleFileChange(e, "profile")}
        accept="image/*"
      />
      <input
        type="file"
        name="logoImage"
        style={{ display: "none" }}
        ref={logoRef}
        onChange={(e) => handleFileChange(e, "logo")}
        accept="image/*"
      />
    </>
  );
};

export default ProfileModal;
