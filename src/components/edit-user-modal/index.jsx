import { Box, Checkbox, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { pencil } from "../../assets";
import Button from "../buttons";
import Dropdown from "../drop-down";
import OutlinedInput from "../input";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../services/users";
import { editUserSchema } from "../../schemas";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useGetAllDevicesQuery } from "../../services/devices";
import { useEffect, useState } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const EditUserModal = ({ user, handleCancel }) => {
  const [editUser, { isLoading }] = useUpdateUserMutation();
  const [deviceOptions, setDeviceOptions] = useState([]);

  const { data: devicesData } = useGetAllDevicesQuery({
    page: "",
    limit: "",
    pageSize: "",
    search: "",
  });

  useEffect(() => {
    if (devicesData?.data) {
      const options = devicesData.data.map((device) => ({
        label: device.name,
        value: device._id,
      }));
      setDeviceOptions(options);
    }
  }, [devicesData]);

  console.log(user, "user");
  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      customer_name: user?.customer_name || "",
      status:
        user?.status?.label === "Active" ? "active" : "inactive" || "inactive",
      userDevices: user?.userDevicesData?.map((d) => d.device_id) || [],
    },
    enableReinitialize: true,
    validationSchema: editUserSchema,
    onSubmit: (values) => {
      const formData = {
        ...values,
        userDevices: values.userDevices,
      };

      editUser({ id: user?._id, formData }).then((res) => {
        if (res?.error) {
          toast.error(res?.error?.data?.message || "Failed to update user");
          return;
        }
        if (res?.data) {
          toast.success(res?.data?.message || "User updated successfully");
          handleCancel();
        }
      });
    },
  });
  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: "25px",
        rowGap: "15px",
      }}
    >
      {/* Name */}
      <OutlinedInput
        label="User Name"
        placeholder="Enter User Name"
        endAdornment={pencil}
        name="name"
        value={formik.values.name}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      {/* Email */}
      <OutlinedInput
        label="Email"
        placeholder="Enter Email"
        name="email"
        value={formik.values.email}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      {/* Phone */}
      <OutlinedInput
        label="Phone No"
        placeholder="Enter Phone No"
        endAdornment={pencil}
        name="phone_number"
        value={formik.values.phone_number}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.phone_number && Boolean(formik.errors.phone_number)
        }
        helperText={formik.touched.phone_number && formik.errors.phone_number}
      />

      {/* Customer */}
      <OutlinedInput
        label="Customer Name"
        placeholder="Enter Customer Name"
        endAdornment={pencil}
        name="customer_name"
        value={formik.values.customer_name}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.customer_name && Boolean(formik.errors.customer_name)
        }
        helperText={formik.touched.customer_name && formik.errors.customer_name}
      />

      {/* Status */}
      <Dropdown
        name="status"
        customLabel="Status"
        variant="filled"
        placeholder="Select Status"
        noLabel
        options={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]}
        value={formik.values.status}
        handleChange={formik.handleChange}
        error={formik.touched.status && Boolean(formik.errors.status)}
        helperText={formik.touched.status && formik.errors.status}
        renderValueSx={{
          color: formik.values.status === "active" ? "#35B21C" : "#EB1B1B",
          fontWeight: 600,
          position: "relative",
          bottom: "8px",
        }}
        selectSx={{
          backgroundColor:
            formik.values.status === "active" ? "#EFEFEF" : "#FDE8E8",
          border: "1.38px solid #DBD6D6",
          borderRadius: "6.92px",
        }}
      />
      <Stack>
        {/* ✅ Devices Multi Select */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize="14px" mb={1} sx={{ color: "#454545" }}>
            {"Assign Devices"}
          </Typography>
        </Stack>
        <Autocomplete
          multiple
          id="user-devices"
          options={deviceOptions || []}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          value={deviceOptions.filter((opt) =>
            formik.values.userDevices.includes(opt.value)
          )}
          onChange={(e, value) =>
            formik.setFieldValue(
              "userDevices",
              value.map((v) => v.value)
            )
          }
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Select devices"
              error={
                formik.touched.userDevices && Boolean(formik.errors.userDevices)
              }
              helperText={
                formik.touched.userDevices && formik.errors.userDevices
              }
            />
          )}
        />
      </Stack>

      {/* Actions */}
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
          <Button
            disabled={isLoading}
            loading={isLoading}
            variant="contained"
            disableRipple
            type="submit"
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditUserModal;
