import { Box, Switch, Typography } from "@mui/material";
import { DynamicModal, OutlinedInput } from "../../../components";
import { useFormik } from "formik";
import { useEffect } from "react";

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

const AddDashboardModal = ({
  open,
  handleClose,
  handleCancel,
  handleAccept,
}) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      mobApplicationSettings: false,
      owners: "",
      groups: "",
      dashboardOrder: "",
    },
    onSubmit: (values) => {
      console.log(values);
      handleClose();
    },
  });

  useEffect(() => {
    if (open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <DynamicModal
      open={open}
      handleClose={handleClose}
      cancelButtonText="Cancel"
      acceptButtonText="Add"
      handleCancel={handleCancel}
      handleAccept={formik.handleSubmit}
      heading={"Add Dashboard"}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "25px",
          rowGap: "17px",
          mt: "15px",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "46%", lg: "47%" } }}>
          <OutlinedInput
            label={"Title"}
            placeholder={"Enter Title here"}
            sx={sharedInputStyles}
            name={"title"}
            value={formik.values.title}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "46%", lg: "47%" } }}>
          <OutlinedInput
            label={"Description "}
            placeholder={"Enter Title here"}
            sx={sharedInputStyles}
            name={"description"}
            value={formik.values.description}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
        </Box>
        <Box
          sx={{
            border: "1.38px solid #DBD6D6",
            borderRadius: "6.92px",
            p: "15px",
            backgroundColor: "#FEFEFE",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "19px", color: "#454545", fontWeight: "500" }}
            >
              Mobile Application Settings
            </Typography>
            <Switch
              name="mobApplicationSettings"
              checked={formik.values.mobApplicationSettings}
              onChange={formik.handleChange}
              sx={{
                "& .MuiSwitch-switchBase": {
                  color: "#004799",
                  "&.Mui-checked": {
                    color: "#004799",
                    "& + .MuiSwitch-track": {
                      backgroundColor: "#048EF1",
                      opacity: 1,
                    },
                  },
                },
                "& .MuiSwitch-track": {
                  opacity: 1,
                  backgroundColor: "#048EF1",
                },
              }}
            />
          </Box>
          <Box sx={{ width: "100%", mt: "5px" }}>
            <OutlinedInput
              placeholder={"Dashboard Order in mobile Application "}
              sx={sharedInputStyles}
              name={"dashboardOrder"}
              value={formik.values.dashboardOrder}
              onInputChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.dashboardOrder &&
                Boolean(formik.errors.dashboardOrder)
              }
              helperText={
                formik.touched.dashboardOrder && formik.errors.dashboardOrder
              }
            />
          </Box>
          <Box
            sx={{
              border: "1.28px dashed #0077FF",
              borderRadius: "6.38px",
              backgroundColor: "#FFFBFB",
              height: "105px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Typography
              sx={{
                fontSize: "16.58px",
                color: "#A1A1AA",
                textAlign: "center",
              }}
            >
              Dashboard Order in mobile Application
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "46%", lg: "47%" } }}>
          <OutlinedInput
            label={"Owner"}
            placeholder={"Owners"}
            sx={sharedInputStyles}
            name={"owners"}
            value={formik.values.owners}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.owners && Boolean(formik.errors.owners)}
            helperText={formik.touched.owners && formik.errors.owners}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "46%", lg: "47%" } }}>
          <OutlinedInput
            label={"Groups"}
            placeholder={"Groups"}
            sx={sharedInputStyles}
            name={"groups"}
            value={formik.values.groups}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.groups && Boolean(formik.errors.groups)}
            helperText={formik.touched.groups && formik.errors.groups}
          />
        </Box>
      </Box>
    </DynamicModal>
  );
};

export default AddDashboardModal;
