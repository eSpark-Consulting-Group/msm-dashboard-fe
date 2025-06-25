import React, { useState } from "react";
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";

const CustomAutoComplete = ({
  options = [],
  value,
  name,
  customLabel,
  placeholder,
  onChange,
  freeSolo = false,
  sx = {},
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const getOption = options.find((opt) => opt.value === value);

  const computedValue = freeSolo ? value || "" : getOption || null;

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
      <Autocomplete
        freeSolo={freeSolo}
        options={options}
        value={computedValue}
        inputValue={inputValue}
        onInputChange={(e, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(event, newValue) => {
          const extractedValue =
            typeof newValue === "string" ? newValue : newValue?.value || "";
          setInputValue(extractedValue);
          onChange(name, extractedValue);
        }}
        onBlur={() => {
          if (freeSolo) {
            onChange(name, inputValue);
          }
        }}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option.label || ""
        }
        isOptionEqualToValue={(option, val) =>
          typeof val === "string"
            ? option.value === val
            : option.value === val?.value
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" placeholder={placeholder} />
        )}
        sx={sx}
      />
    </>
  );
};

export default CustomAutoComplete;
