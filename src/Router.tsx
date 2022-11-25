import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

/*

      main: "#1F64FF",
      primary: "#000429",
      light: "#F5F5F5",

*/

export const Router = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1F64FF",
        light: "#F5F5F5",
      },
      secondary: {
        main: "#000429",
      },
    },
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};
