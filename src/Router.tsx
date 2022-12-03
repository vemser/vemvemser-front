import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Candidates } from "./pages/Candidates";
import { Home } from "./pages/Home";
import { theme } from "./utils/theme";
import { CandidatesProvider } from "./context/CandidatesContext";
import { PrivateRoute } from "./pages/PrivateRoute";
import { Dashboard } from "./pages/Dashboard";
import { NewUser } from "./pages/NewUser";
import { EditUser } from "./pages/EditUser";
import { ManagerProvider } from "./context/ManagerContext";
import { Subscription } from "./pages/Subscription";
import { AuthProvider } from "./context/AuthContext";
import { Curriculum } from "./pages/Curriculum";
import { AvaliationProvider } from "./context/AvaliationContext";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Recover } from "./pages/Recover";
import { Avaliation } from "./pages/Avaliation";
import { Perfil } from "./pages/Perfil";

export const Router = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ManagerProvider>
            <CandidatesProvider>
              <AvaliationProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Candidates />} />
                  <Route
                    path="/forgot-password/"
                    element={<ForgotPassword />}
                  />
                  <Route path="/recover-password/" element={<Recover />} />

                  <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/new-user" element={<NewUser />} />
                    <Route path="/dashboard/edit-user" element={<EditUser />} />
                    <Route path="/subscriptions/" element={<Subscription />} />
                    <Route
                      path="/subscriptions/curriculum"
                      element={<Curriculum />}
                    />
                    <Route path="/avaliations" element={<Avaliation />} />
                    <Route path="/perfil" element={<Perfil />} />
                  </Route>
                </Routes>
              </AvaliationProvider>
            </CandidatesProvider>
          </ManagerProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};
