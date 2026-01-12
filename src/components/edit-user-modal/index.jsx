import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Box, Checkbox, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import OutlinedInput from "../input";
import Button from "../buttons";
import Dropdown from "../drop-down";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useUpdateUserMutation } from "../../services/users";
import { useGetAllDevicesQuery } from "../../services/devices";
import { editUserSchema } from "../../schemas";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const filter = createFilterOptions({
  stringify: (option) => option.label.toLowerCase(),
});

const EditUserModal = ({ user, handleCancel }) => {
  const [editUser, { isLoading }] = useUpdateUserMutation();
  const [deviceOptions, setDeviceOptions] = useState([]);

  const { data: devicesData, isLoading: deviceDataLoading } =
    useGetAllDevicesQuery({
      page: "",
      limit: "",
      pageSize: "",
      search: "",
    });

  // Map all devices to {label, value} format
  useEffect(() => {
    if (devicesData?.data) {
      const options = devicesData.data.map((device) => ({
        label: device.name,
        value: device._id,
      }));
      setDeviceOptions(options);
    }
  }, [devicesData]);

  // Map user’s selected devices to match deviceOptions objects
  const getSelectedDevices = () => {
    if (!user?.userDevicesData || !deviceOptions.length) return [];
    return user.userDevicesData
      .map((d) => deviceOptions.find((o) => o.value === d.device_id))
      .filter(Boolean); // remove any unmatched
  };

  const formik = useFormik({
    initialValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      customer_name: user?.customer_name || "",
      status: !user?.isPasswordChanged
        ? "Pending"
        : user?.status?.label === "Active"
        ? "active"
        : "inactive",
      userDevices: getSelectedDevices(),
    },
    enableReinitialize: true,
    validationSchema: editUserSchema,
    onSubmit: (values) => {
      const formData = {
        ...values,
        userDevices: values.userDevices.map((d) => d.value),
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
      sx={{ display: "flex", flexDirection: "column", mt: 3, rowGap: 2 }}
    >
      <OutlinedInput
        label="User Name"
        placeholder="Enter User Name"
        name="name"
        value={formik.values.name}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

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

      <OutlinedInput
        label="Phone No"
        placeholder="Enter Phone No"
        name="phone_number"
        value={formik.values.phone_number}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.phone_number && Boolean(formik.errors.phone_number)
        }
        helperText={formik.touched.phone_number && formik.errors.phone_number}
      />

      <OutlinedInput
        label="Customer Name"
        placeholder="Enter Customer Name"
        name="customer_name"
        value={formik.values.customer_name}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.customer_name && Boolean(formik.errors.customer_name)
        }
        helperText={formik.touched.customer_name && formik.errors.customer_name}
      />

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
        }}
      />

      {user?.role?.name === "user" && (
        <Stack>
          <Typography fontSize="14px" mb={1} sx={{ color: "#454545" }}>
            Assign Devices
          </Typography>
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={deviceOptions}
            value={formik.values.userDevices}
            onChange={(event, newValue) =>
              formik.setFieldValue("userDevices", newValue)
            }
            loading={deviceDataLoading}
            getOptionLabel={(option) => option.label || ""}
            filterOptions={filter}
            renderOption={(props, option, { selected }) => (
              <li {...props} key={option.value}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select Devices"
                error={
                  formik.touched.userDevices &&
                  Boolean(formik.errors.userDevices)
                }
                helperText={
                  formik.touched.userDevices && formik.errors.userDevices
                }
              />
            )}
          />
        </Stack>
      )}

      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "flex-end",
          columnGap: 2,
        }}
      >
        <Box sx={{ width: 200, height: 50 }}>
          <Button variant="outlined" disableRipple onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
        <Box sx={{ width: 200, height: 50 }}>
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
