import { TextField, InputAdornment } from "@mui/material";
import { searchIcon } from "../../assets";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Type to search",
}) {
  return (
    <TextField
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          paddingLeft: 0,
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
