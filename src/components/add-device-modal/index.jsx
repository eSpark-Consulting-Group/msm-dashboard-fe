import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import OutlinedInput from "../input";
import Button from "../buttons";
import Dropdown from "../drop-down";
import DynamicModal from "../modal";
import AddGroupModal from "../add-group-modal";
import { useAddDeviceMutation } from "../../services/devices";
import { useGetAllGroupsQuery } from "../../services/groups";
import { deviceSchema } from "../../schemas";

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
  // { name: "label", label: "Label", placeholder: "Description" },
  // {
  //   name: "deviceProfile",
  //   label: "Device Profile",
  //   placeholder: "Device profile",
  // },
  // { name: "description", label: "Description", placeholder: "Description" },
  // { name: "owners", label: "Owner", placeholder: "Owners" },
];

const credentials = [
  // { name: "accessToken", label: "Access Token", placeholder: "Owners" },
  // { name: "x509", label: "X.509", placeholder: "Certificate in PEM format" },
  // { name: "clientId", label: "MQTTS Client ID", placeholder: "ID" },
  // { name: "user", label: "MQTTS User", placeholder: "User" },
  // { name: "userName", label: "MQTTS User Name", placeholder: "User Name" },
  { name: "device_uuid", label: "Device ID", placeholder: "device Id" },
  {
    name: "password",
    label: "Device Password",
    placeholder: "Password",
    type: "password",
  },
];

const AddDeviceModal = ({ onCancel }) => {
  const [addDevice, { isLoading }] = useAddDeviceMutation();
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const [groupOptions, setGroupOptions] = useState([]);

  const {
    data: groupsData,
    isLoading: groupsLoading,
    error: groupsError,
  } = useGetAllGroupsQuery(
    { page: 1, limit: 100, search: "" },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (groupsData?.data) {
      const options = groupsData.data.map((group) => ({
        label: group.name,
        value: group._id,
      }));
      setGroupOptions(options);
    }
  }, [groupsData]);

  useEffect(() => {
    if (groupsError) {
      toast.error(groupsError?.data?.message || "Failed to fetch groups");
    }
  }, [groupsError]);

  const formik = useFormik({
    initialValues: {
      name: "",
      // label: "",
      // deviceProfile: "",
      // description: "",
      // owners: "",
      groups: "",
      device_uuid: "",
      password: "",
      // user: "",
      // userName: "",
      // clientId: "",
      // x509: "",
      // accessToken: "",
    },
    validationSchema: deviceSchema,
    onSubmit: (values) => {
      const bodyToSend = {
        name: values?.name,
        device_uuid: values?.device_uuid,
        // label: values?.label,
        group_id: values?.groups,
        // device_profile: values?.deviceProfile,
        // description: values?.description,
        // owner: values?.owners,
        // access_token: values?.accessToken,
        // z509: values?.x509,
        // mqtt_client_id: values?.clientId,
        // mqtt_user: values?.user,
        // mqtt_username: values?.userName,
        mqtt_password: values?.password,
      };
      addDevice(bodyToSend).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message || "Failed to add device");
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message || "Device added successfully");
          onCancel();
        }
      });
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

  if (groupsLoading) {
    return (
      <Stack justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
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
          name="groups"
          customLabel="Group"
          variant="outlined"
          placeholder="Select Group"
          noLabel
          options={groupOptions}
          value={formik.values.groups}
          handleChange={formik.handleChange}
          error={
            groupOptions <= 0
              ? true
              : formik.touched.groups && Boolean(formik.errors.groups)
          }
          helperText={
            groupOptions <= 0
              ? "Groups not found. please add group"
              : formik.touched.groups && formik.errors.groups
          }
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

      <Button onClick={() => setOpenGroupModal(true)} variant="contained">
        Add Group
      </Button>

      <Box sx={{ width: "100%" }}>
        <Typography sx={{ fontSize: "18.43px", fontWeight: "700" }}>
          Device Credentials
        </Typography>
      </Box>

      {credentials.map(renderInput)}
      <Box
        sx={{
          mt: "30px",
          display: "flex",
          justifyContent: "flex-end",
          columnGap: "20px",
          width: "100%",
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
      <DynamicModal
        open={openGroupModal}
        handleClose={() => setOpenGroupModal(false)}
        heading={"Add Entity Group"}
      >
        <AddGroupModal handleCancel={() => setOpenGroupModal(false)} />
      </DynamicModal>
    </Box>
  );
};

export default AddDeviceModal;
