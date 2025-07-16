import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DropDownIcon } from "../../assets";

const CustomIcon = (props) => (
  <img
    {...props}
    src={DropDownIcon}
    alt="Dropdown Icon"
    width="16"
    height="8"
    style={{ pointerEvents: "none", position: "relative", top: "0px" }}
  />
);

const Dropdown = ({
  name,
  disabled,
  customLabel,
  variant,
  noLabel,
  options: dropdownOptions,
  handleChange,
  placeholder,
  error,
  helperText,
  value,
  renderValueSx = {},
  selectSx = {},
}) => {
  const [options] = useState(
    noLabel
      ? [{ label: placeholder, value: placeholder }, ...dropdownOptions]
      : dropdownOptions
  );

  const defaultRenderValueStyle = {
    color: "#A1A1AA",
    ...renderValueSx,
  };

  return (
    <>
      {customLabel && (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography fontSize="14px" mb={1} sx={{ color: "#454545" }}>
            {customLabel}
          </Typography>
        </Stack>
      )}

      <FormControl sx={{ width: "100%" }} variant="filled" error={error}>
        {!noLabel && (
          <InputLabel id="demo-simple-select-filled-label">
            {placeholder}
          </InputLabel>
        )}

        <Select
          name={name}
          variant={variant}
          disabled={disabled}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={handleChange}
          value={value || options[0]?.value}
          sx={{
            color: "#A1A1AA",
            ...selectSx,
            "&::before": {
              borderBottom: "none",
            },
            "&::after": {
              borderBottom: "none",
            },
            "&:hover::before": {
              borderBottom: "none !important", 
            },
          }}
          IconComponent={CustomIcon}
          renderValue={(selected) => {
            if (!selected) {
              return (
                <span style={{ color: "#aaa", ...renderValueSx }}>
                  {placeholder}
                </span>
              );
            }
            const selectedOption = options?.find(
              (opt) => opt.value === selected
            );
            return (
              <span style={defaultRenderValueStyle}>
                {selectedOption ? selectedOption.label : selected}
              </span>
            );
          }}
        >
          {options?.map(
            (item, index) =>
              index !== 0 && (
                <MenuItem value={item?.value} key={index}>
                  {item?.label}
                </MenuItem>
              )
          )}
        </Select>

        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default Dropdown;
