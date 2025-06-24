import { TextField, InputAdornment } from "@mui/material";
import { searchIcon } from "../../assets";
import { useState, useRef } from "react";

export default function SearchBar({
  onChange,
  placeholder = "Type to search",
}) {
  const [search, setSearch] = useState("");
  const timeoutRef = useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChange(val);
    }, 500);
  };

  return (
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
      value={search}
      onChange={handleChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" sx={{ pl: 1.5 }}>
            <img src={searchIcon} alt="search" />
          </InputAdornment>
        ),
      }}
    />
  );
}
