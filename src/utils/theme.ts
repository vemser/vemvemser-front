import { createTheme } from "@mui/material";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1F64FF",
      light: "#F5F5F5",
    },
    secondary: {
      main: "#000429",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
