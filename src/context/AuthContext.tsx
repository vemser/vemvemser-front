import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { baseurl } from "../utils/baseurl";
import { useNavigate } from "react-router-dom";
import nProgress from "nprogress";
import axios from "axios";
import {
  IAuthContext,
  IChildren,
  ILogin,
  ILoginDados,
} from "../utils/interfaces";

export const ManagerContext = createContext({} as IAuthContext);

export const AuthProvider = ({ children }: IChildren) => {
  const [loginDados, setLoginDados] = useState<ILoginDados>({} as ILoginDados);

  const navigate = useNavigate();

  const auth = async (values: ILogin) => {
    try {
      nProgress.start();
      await axios.post(`${baseurl}/auth/login`, values).then((res) => {
        setLoginDados(res.data);
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      });
    } catch (error: any) {
      error?.response.status === 403 && toast.error("Email ou senha inválidos");
    } finally {
      nProgress.done();
    }
  };

  return (
    <ManagerContext.Provider value={{ auth, loginDados }}>
      {children}
    </ManagerContext.Provider>
  );
};

export const useAuth = () => useContext(ManagerContext);
