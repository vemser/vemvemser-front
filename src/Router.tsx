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

export const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ManagerProvider>
            <CandidatesProvider>
              <AvaliationProvider>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Candidates />} />

                  <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/new-user" element={<NewUser />} />
                    <Route path="/dashboard/edit-user" element={<EditUser />} />
                    <Route path="/subscriptions/" element={<Subscription />} />
                    <Route
                      path="/subscriptions/curriculum"
                      element={<Curriculum />}
                    />
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
