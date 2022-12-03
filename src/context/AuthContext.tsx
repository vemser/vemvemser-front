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

  const forgotPassword = async (email: string, url: string) => {
    try {
      nProgress.start();
      await axios.post(`${baseurl}/auth/forgot-password`, {
        email,
        url,
      });
      toast.success("Email enviado com sucesso!");
    } catch (error: any) {
      toast.error(error?.response.data.message);
    } finally {
      nProgress.done();
    }
  };

  const changePasswordByIdGestor = async (idGestor: number, senha: string) => {
    const token = localStorage.getItem("token");
    nProgress.start();
    try {
      axios
        .put(
          `${baseurl}/gestor/trocar-senha/${idGestor}`,
          { senha },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          localStorage.removeItem("token");
          toast.success("Senha alterada com sucesso!");
          navigate("/");
        });
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  return (
    <ManagerContext.Provider
      value={{ auth, forgotPassword, changePasswordByIdGestor, loginDados }}
    >
      {children}
    </ManagerContext.Provider>
  );
};

export const useAuth = () => useContext(ManagerContext);
