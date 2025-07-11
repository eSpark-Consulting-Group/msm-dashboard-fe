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

const AddGroupModal = ({ handleCancel, handleAccept }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      share: false,
      customer: "",
      alluser: false,
    },
    onSubmit: (values) => {
      console.log(values);
      handleAccept();
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
            checked={formik.values.share}
            onChange={formik.handleChange}
            name="share"
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
        name={"customer"}
        value={formik.values.customer}
        onInputChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.customer && Boolean(formik.errors.customer)}
        helperText={formik.touched.customer && formik.errors.customer}
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
            checked={formik.values.alluser}
            onChange={formik.handleChange}
            name="alluser"
            sx={{ color: "#0C89E2", "&.Mui-checked": { color: "#0C89E2" } }}
          />
        }
        label="Add end date and time"
      />
      <RadioGroup
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          columnGap: "80px",
          pl: "35px",
        }}
        name="permission"
        value={formik.values.permission}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <FormControlLabel
          value="Read"
          control={
            <Radio
              sx={{ color: "#0C89E2", "&.Mui-checked": { color: "#0C89E2" } }}
            />
          }
          label="Read"
        />
        <FormControlLabel
          value="Write"
          control={
            <Radio
              sx={{ color: "#0C89E2", "&.Mui-checked": { color: "#0C89E2" } }}
            />
          }
          label="Write"
        />
        <FormControlLabel
          value="Others"
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
            Confirm
          </Button>
        </Box>
        <Box sx={{ width: "203.70px", height: "50px" }}>
          <Button variant="contained" disableRipple type="submit">
            Add
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddGroupModal;
