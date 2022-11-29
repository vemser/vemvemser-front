import { Outlet, Navigate } from "react-router-dom";
import { DrawerContainer } from "../../components/drawerContainer";

export const PrivateRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  } else {
    return (
      <DrawerContainer>
        <Outlet />
      </DrawerContainer>
    );
  }
};
