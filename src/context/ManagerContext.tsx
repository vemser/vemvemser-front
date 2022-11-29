import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { baseurl } from "../utils/baseurl";
import { useNavigate } from "react-router-dom";
import {
  IManagerContext,
  IChildren,
  IGestor,
  ILogin,
} from "../utils/interfaces";
import nProgress from "nprogress";
import axios from "axios";

export const ManagerContext = createContext({} as IManagerContext);
export const ManagerProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();

  const [gestorDadosLogin, setGestorDadosLogin] = useState({});
  const [gestorDados, setGestorDados] = useState<IGestor[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUserlogin = async (user: ILogin) => {
    nProgress.start();
    try {
      await axios.post(`${baseurl}/Gestor`, user).then((response) => {
        setGestorDadosLogin(response.data);
        localStorage.setItem("token", "asd");
        navigate("/dashboard");
      });
    } catch (error: any) {
      error?.response.status === 400 && toast.error("Email ou senha inválidos");
    } finally {
      nProgress.done();
    }
  };

  const createNewManager = async (manager: IGestor) => {
    nProgress.start();
    try {
      await axios.post(`${baseurl}/Gestor/cadastro`, manager).then(() => {
        toast.success("Usuário cadastrado com sucesso");
        navigate("/dashboard");
      });
    } catch (error) {
      toast.error("Erro ao cadastrar usuário");
    } finally {
      nProgress.done();
    }
  };

  const getManagers = async () => {
    nProgress.start();
    setLoading(true);
    try {
      await axios.get(`${baseurl}/Gestor`).then((response) => {
        setGestorDados(response.data);
      });
    } catch (error) {
      toast.error("Erro ao buscar usuários");
    } finally {
      nProgress.done();
      setLoading(false);
    }
  };

  const deleteManager = async (idManager: number) => {
    nProgress.start();
    try {
      await axios.delete(`${baseurl}/Gestor/${idManager}`).then(() => {
        toast.success("Usuário deletado com sucesso");
        getManagers();
        navigate("/dashboard");
      });
    } catch (error) {
      toast.error("Erro ao deletar usuário");
    } finally {
      nProgress.done();
    }
  };

  return (
    <ManagerContext.Provider
      value={{
        handleUserlogin,
        createNewManager,
        getManagers,
        deleteManager,
        gestorDados,
        loading,
        gestorDadosLogin,
      }}
    >
      {children}
    </ManagerContext.Provider>
  );
};

export const useManager = () => useContext(ManagerContext);
