import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { eye, eyeClose } from "../../assets";

const OutlinedInput = ({
  label,
  name,
  placeholder,
  onInputChange,
  sx,
  value,
  startAdornment,
  multiline,
  onKeyDown,
  disabled,
  type = "text",
  readOnly,
  error,
  helperText,
  onBlur,
  endAdornment,
  labelStyle,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "8px",
        width: "100%",
      }}
    >
      {label && (
        <Typography
          component="label"
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#454545",
            ...labelStyle,
          }}
        >
          {label}
        </Typography>
      )}
      <TextField
        name={name}
        placeholder={placeholder}
        onChange={onInputChange}
        value={value}
        sx={sx}
        onKeyDown={onKeyDown}
        disabled={disabled}
        multiline={multiline}
        onBlur={onBlur}
        type={type === "password" && !showPassword ? "password" : "text"}
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment position="start">
              {typeof startAdornment === "string" ? (
                <img
                  src={startAdornment}
                  alt="icon"
                  style={{ width: 24, height: 24 }}
                />
              ) : (
                startAdornment
              )}
            </InputAdornment>
          ),
          endAdornment: (
            <>
              {type === "password" && value?.length > 0 && (
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? (
                    <img
                      src={eye}
                      alt="Icon"
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "10px",
                        marginTop: "5px",
                      }}
                    />
                  ) : (
                    <img
                      src={eyeClose}
                      alt="Icon"
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "10px",
                        marginTop: "5px",
                      }}
                    />
                  )}
                </IconButton>
              )}
              {endAdornment && (
                <InputAdornment position="end" sx={{ mr: "5px" }}>
                  {typeof endAdornment === "string" ? (
                    <img
                      src={endAdornment}
                      alt="icon"
                      style={{ width: 24, height: 24 }}
                    />
                  ) : (
                    endAdornment
                  )}
                </InputAdornment>
              )}
            </>
          ),

          readOnly: readOnly,
        }}
        error={error}
      />
      <Typography variant="caption" color="red" sx={{ display: "block" }}>
        {helperText ? helperText : ""}
      </Typography>
    </Box>
  );
};

export default OutlinedInput;
