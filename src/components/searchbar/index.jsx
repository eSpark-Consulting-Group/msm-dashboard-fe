import { TextField, InputAdornment, Box, Typography } from "@mui/material";
import { searchIcon } from "../../assets";
import { useState, useRef, useEffect } from "react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Type to search",
  label,
}) {
  const [search, setSearch] = useState(value || "");
  const timeoutRef = useRef(null);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChange(val);
    }, 500);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
      {label && (
        <Typography
          component="label"
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            color: "#454545",
          }}
        >
          {label}
        </Typography>
      )}
      <TextField
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-root": {
            paddingLeft: 0,
            background: "#fff",
            borderRadius: "10px",
            backgroundColor: "white",
            height: 40,
            "& fieldset": {
              borderColor: "#E4E4E7",
            },
            "&:hover fieldset": {
              borderColor: "#E4E4E7",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#E4E4E7",
            },
            "& input": {
              padding: "11px 16px 11px 0",
              fontSize: 16,
            },
          },
        }}
        variant="outlined"
        placeholder={placeholder}
        value={search || ""}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ pl: 1.5 }}>
              <img src={searchIcon} alt="search" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
