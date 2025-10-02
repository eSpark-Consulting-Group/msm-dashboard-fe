import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  Stack,
  Typography,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
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
  multiple = false,
  options: dropdownOptions,
  handleChange,
  placeholder,
  error,
  helperText,
  value,
  renderValueSx = {},
  selectSx = {},
}) => {
  const [options, setOptions] = useState(dropdownOptions);

  const defaultRenderValueStyle = {
    color: "#A1A1AA",
    ...renderValueSx,
  };

  useEffect(() => {
    setOptions(dropdownOptions);
  }, [dropdownOptions]);

  return (
    <>
      <FormControl sx={{ width: "100%" }} variant="filled" error={error}>
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
        
        {!noLabel && (
          <InputLabel id={`${name}-label`}>{placeholder}</InputLabel>
        )}

        <Select
          multiple={multiple}
          name={name}
          variant={variant}
          disabled={disabled}
          labelId={`${name}-label`}
          id={`${name}-select`}
          onChange={handleChange}
          value={value || (multiple ? [] : "")}
          displayEmpty
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
            if (
              !selected ||
              (Array.isArray(selected) && selected.length === 0)
            ) {
              return (
                <span style={{ color: "#aaa", ...renderValueSx }}>
                  {placeholder}
                </span>
              );
            }

            if (multiple) {
              return (
                <span style={defaultRenderValueStyle}>
                  {options
                    .filter((opt) => selected.includes(opt.value))
                    .map((opt) => opt.label)
                    .join(", ")}
                </span>
              );
            } else {
              const selectedOption = options.find(
                (opt) => opt.value === selected
              );
              return (
                <span style={defaultRenderValueStyle}>
                  {selectedOption ? selectedOption.label : selected}
                </span>
              );
            }
          }}
        >
          <MenuItem disabled value="">
            <em>{placeholder}</em>
          </MenuItem>

          {options?.map((item, index) => (
            <MenuItem value={item?.value} key={index}>
              {multiple && <Checkbox checked={value?.includes(item?.value)} />}
              <ListItemText primary={item?.label} />
            </MenuItem>
          ))}
        </Select>

        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default Dropdown;
