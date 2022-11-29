import { createTheme } from "@mui/material";
import styled from "@emotion/styled";

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

export const Radio = styled.input`
  width: 13px;
  height: 13px;
  margin-right: 7px;
  transition: all 0.2s ease-in-out;
  &:before {
    content: "";
    display: flex;
    outline: 4px solid #1f64ff;
    border-radius: 50%;
    width: 13px;
    height: 13px;
    background: white;
    transition: all 0.2s ease-in-out;
  }
  &:checked {
    width: 13px;
    height: 13px;
    transition: all 0.2s ease-in-out;

    &:before {
      background-color: #1f64ff;
      content: "";
      transition: all 0.2s ease-in-out;
    }
  }

  // remove the default outline
`;
