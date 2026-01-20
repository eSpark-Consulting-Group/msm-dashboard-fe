import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { eye, eyeClose } from "../../assets";

const OutlinedInput = ({
  label,
  name,
  placeholder,
  value,
  onInputChange,
  onBlur,
  sx,
  type = "text",
  disabled = false,
  readOnly = false,
  multiline = false,
  error = false,
  helperText = "",
  startAdornment,
  endAdornment,
  labelStyle,
  isEndorementText,
  onKeyDown,
  min,
  max,
  step,
  autoComplete = "off",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

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
            fontWeight: 400,
            color: "#454545",
            ...labelStyle,
          }}
        >
          {label}
        </Typography>
      )}

      <TextField
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onInputChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        disabled={disabled}
        multiline={multiline}
        sx={sx}
        error={error}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        InputProps={{
          readOnly,

          startAdornment: startAdornment && (
            <InputAdornment position="start">
              {typeof startAdornment === "string" ? (
                <img src={startAdornment} alt="icon" width={24} height={24} />
              ) : (
                startAdornment
              )}
            </InputAdornment>
          ),

          endAdornment: (
            <>
              {isPassword && value?.length > 0 && (
                <IconButton
                  onClick={() => setShowPassword((p) => !p)}
                  edge="end"
                >
                  <img
                    src={showPassword ? eye : eyeClose}
                    alt="toggle"
                    width={24}
                    height={24}
                  />
                </IconButton>
              )}

              {endAdornment && (
                <InputAdornment position="end" sx={{ mr: "5px" }}>
                  {typeof endAdornment === "string" && !isEndorementText ? (
                    <img src={endAdornment} alt="icon" width={24} height={24} />
                  ) : (
                    endAdornment
                  )}
                </InputAdornment>
              )}
            </>
          ),
        }}
        /** 🔥 THIS is what fixes Chrome autofill */
        inputProps={{
          autoComplete,
          min,
          max,
          step,
        }}
      />

      {helperText && (
        <Typography variant="caption" color="red">
          {helperText}
        </Typography>
      )}
    </Box>
  );
};

export default OutlinedInput;
