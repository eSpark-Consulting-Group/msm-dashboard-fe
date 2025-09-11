import { toast } from "react-toastify";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useFormik } from "formik";
import OutlinedInput from "../input";
import Button from "../buttons";
import { useCreateGroupMutation } from "../../services/groups";

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

const AddGroupModal = ({ handleCancel }) => {
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      share_entity_group: false,
      customer_name: "",
      all_user: false,
    },
    onSubmit: (values) => {
      createGroup(values)
        .then((res) => {
          if (res?.error) {
            toast.error(res?.error?.data?.message || "Failed to create group");
            return;
          }
          if (res?.data) {
            toast.success(res?.data?.message || "Group created successfully");
            handleCancel()
          }
        })
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "20px",
        mt: "25px",
      }}
      component={"form"}
      onSubmit={formik.handleSubmit}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: "25px",
          rowGap: "17px",
        }}
      >
        <Box sx={{ width: { xs: "100%", md: "46%", lg: "47%" } }}>
          <OutlinedInput
            label={"Name"}
            placeholder={"Enter Title here"}
            type={"text"}
            sx={sharedInputStyles}
            name={"name"}
            value={formik.values.name}
            onInputChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "46%", lg: "47%" } }}>
          <OutlinedInput
            label={"Description "}
            placeholder={"Enter Title here"}
            type={"text"}
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
      </Box>
      <FormControlLabel
        sx={{
          width: "100%",
          alignItems: "flex-start",
          padding: 0,
          margin: 0,
          gap: "10px",
          span: { padding: 0 },
        }}
        control={
          <Checkbox
            checked={formik.values.share_entity_group}
            onChange={formik.handleChange}
            name="share_entity_group"
            sx={{ color: "#0C89E2", "&.Mui-checked": { color: "#0C89E2" } }}
          />
        }
        label="Share Entity Group"
      />
      <OutlinedInput
        label={"Customer"}
        placeholder={"Enter name"}
        type={"text"}
        sx={sharedInputStyles}
        name={"customer_name"}
        value={formik.values.customer_name}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.customer_name && Boolean(formik.errors.customer_name)}
        helperText={formik.touched.customer_name && formik.errors.customer_name}
      />
      <FormControlLabel
        sx={{
          width: "100%",
          alignItems: "flex-start",
          padding: 0,
          margin: 0,
          gap: "10px",
          span: { padding: 0 },
        }}
        control={
          <Checkbox
            checked={formik.values.all_user}
            onChange={formik.handleChange}
            name="all_user"
            sx={{ color: "#0C89E2", "&.Mui-checked": { color: "#0C89E2" } }}
          />
        }
        label="All Users"
      />
      <RadioGroup
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          columnGap: "80px",
          pl: "35px",
        }}
        name="permissions"
        value={formik.values.permissions}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <FormControlLabel
          value="read"
          control={
            <Radio
              sx={{ color: "#0C89E2", "&.Mui-checked": { color: "#0C89E2" } }}
            />
          }
          label="Read"
        />
        <FormControlLabel
          value="write"
          control={
            <Radio
              sx={{ color: "#0C89E2", "&.Mui-checked": { color: "#0C89E2" } }}
            />
          }
          label="Write"
        />
        <FormControlLabel
          value="others"
          control={
            <Radio
              sx={{ color: "#0C89E2", "&.Mui-checked": { color: "#0C89E2" } }}
            />
          }
          label="Others"
        />
      </RadioGroup>

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
          <Button disabled={isLoading} loading={isLoading} variant="contained" disableRipple type="submit">
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddGroupModal;
