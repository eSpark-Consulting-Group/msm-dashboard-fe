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
          height: "60px",
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
            background: "transparent",
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
      ],
    },
    MuiChip: {
      variants: [
        {
          props: { variant: "green" },
          style: {
            paddingTop: "3.41px",
            paddingRight: "14px",
            paddingBottom: "3.41px",
            paddingLeft: "14px",
            backgroundColor: "#A9F49A",
            border: "0.57px solid #30F408",
            borderRadius: "10.5px",
            color: "#22A309",
            textTransform: "capitalize",
            height: "21px",
          },
        },
        {
          props: { variant: "red" },
          style: {
            paddingTop: "7px",
            paddingRight: "14px",
            paddingBottom: "3.41px",
            paddingLeft: "14px",
            backgroundColor: "#E434153B",
            border: "0.57px solid #E43415",
            borderRadius: "10.5px",
            color: "#E43415",
            textTransform: "capitalize",
            height: "27px",
          },
        },
        {
          props: { variant: "yellow" },
          style: {
            paddingTop: "7px",
            paddingRight: "14px",
            paddingBottom: "3.41px",
            paddingLeft: "14px",
            backgroundColor: "#E4D3153B",
            border: "0.57px solid #E4AD15",
            borderRadius: "10.5px",
            color: "#E4AD15",
            textTransform: "capitalize",
            height: "27px",
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
  },
});
