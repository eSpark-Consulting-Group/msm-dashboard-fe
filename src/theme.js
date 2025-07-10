import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 601,
      md: 769,
      lg: 1281,
      xl: 1921,
    },
  },
  palette: {
    primary: {
      main: "#505050",
      light: "#A1A1A1",
      dark: "#454545",
    },
    secondary: {
      main: "#0C89E2",
      light: "#5AB4F4",
      dark: "#0077FF",
    },
    text: {
      primary: "#505050",
      secondary: "#FFF",
    },
  },
  typography: {
    fontFamily: "'AlbertSans', sans-serif",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#505050",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          height: "45px",
          textTransform: "capitalize",
          width: "100%",
          borderRadius: "16px",
          fontSize: "20px",
          fontWeight: "500",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          lineHeight: "0px",
          transition: "all 0.3s ease-in-out",
        },
      },
      variants: [
        {
          props: { variant: "contained", color: "primary" },
          style: {
            color: "#FFF",
            background: "#5AB4F4",
            "&:hover": {
              background: "#0077FF",
              color: "#FFF",
              border: "2px solid #FFF",
            },
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            background: "#FFFFFF",
            border: "1px solid #0077FF",
            color: "#0077FF",
            "&:hover": {
              border: "2px solid #FFF !important",
              color: "#FFF",
              background: "#0077FF",
              boxShadow: "0px 0px 20px -6px #12203B",
            },
          },
        },
        {
          props: { variant: "blue" },
          style: {
            backgroundColor: "#0095FF",
            color: "#FFFFFF",
            border: "1px solid #0077FF",
            width: "193px",
            height: "45px",
            fontSize: "16px",
            fontWeight: 400,
            borderRadius: "12px",
          },
        },
      ],
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderCollapse: "separate !important",
          borderSpacing: "0 10px",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          ".MuiTableRow-root": {
            background: "#fff",
            borderRadius: "4px",
          },
          ".MuiTableCell-root": {
            whiteSpace: "nowrap",
            color: "#454545",
            borderBottom: "none",
            fontSize: "18px",
            fontWeight: 500,
            padding: "20px 0px",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          ".MuiTableRow-root": {
            background: "#fff",
            borderRadius: "4px",
          },
          "& .MuiTableCell-root": {
            whiteSpace: "nowrap",
            borderBottom: "none",
            color: "#505050",
            fontSize: "16px",
            padding: "10px 16px",
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          fontWeight: 500,
          color: "#505050",
          borderRadius: "8px",
          border: "1px solid #ccc",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },

          "&.Mui-selected": {
            backgroundColor: "#0077FF",
            color: "#fff",
            borderColor: "#0077FF",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          },
          "&.MuiPaginationItem-previousNext": {
            color: "#505050",
            border: "1.5px solid #505050",
            borderRadius: "50%",
            width: "20px",
            minWidth: "20px",
            maxWidth: "20px",
            height: "20px",
          },
        },
      },
    },
    MuiChip: {
      variants: [
        {
          props: { variant: "green" },
          style: {
            backgroundColor: "#EFFFEC",
            border: "1px solid #05A300",
            borderRadius: "21px",
            color: "#05A300",
            width: "100px",
            height: "30px",
            fontSize: "16px",
            fontWeight: 400,
          },
        },
        {
          props: { variant: "red" },
          style: {
            backgroundColor: "#FFDCD1",
            border: "1px solid #EB1B1B",
            borderRadius: "21px",
            color: "#EB1B1B",
            width: "100px",
            height: "30px",
            fontSize: "16px",
            fontWeight: 400,
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: "transparent",
            border: "1px solid #0077FF",
            borderRadius: "21px",
            color: "#505050",
            width: "100px",
            height: "30px",
            fontSize: "16px",
            fontWeight: 400,
          },
        },
        {
          props: { variant: "simple" },
          style: {
            backgroundColor: "#ffffff",
            color: "#505050",
            width: "100px",
            height: "30px",
            fontSize: "16px",
            fontWeight: 400,
          },
        },
      ],
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 5,
          borderRadius: 5,
          backgroundColor: "#e0e0e0",
        },
        bar: {
          borderRadius: 5,
          backgroundColor: "#0C89E2",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            color: "#A1A1AA",
            fontWeight: "400",
            opacity: 1,
            fontSize: "14px",
          },
          "&:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 1000px transparent inset",
            WebkitTextFillColor: "#000",
            transition: "background-color 5000s ease-in-out 0s",
          },
        },

        root: {
          border: "1px solid #E4E4E4",
          width: "100%",
          outline: "none",
          padding: "0px 5px",
          fontSize: "14px",
          color: "#000",
          fontWeight: 400,
          borderRadius: "5px",
          backgroundColor: "#FFFFFF",
          height: "40px",
          ":focus": {
            border: "1px solid #E4E4E4",
          },
          fieldset: {
            border: 0,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "24.85px",
          padding: "10px",
          boxShadow: "0px 2.84px 2.84px 0px #00000040 !important",
          backgroundColor: "#FFFFFF",
          border: "none",
        },
      },
    },
  },
});
