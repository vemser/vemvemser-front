import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { baseurl } from "../utils/baseurl";
import { useNavigate } from "react-router-dom";
import {
  IManagerContext,
  IChildren,
  IGestor,
  IGestorDados,
  ITabelaGestorPage,
} from "../utils/interfaces";
import nProgress from "nprogress";
import axios from "axios";
import { useAuth } from "./AuthContext";

export const ManagerContext = createContext({} as IManagerContext);
export const ManagerProvider = ({ children }: IChildren) => {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [gestorDados, setGestorDados] = useState<IGestorDados[]>([]);
  const [pageDados, setPageDados] = useState<ITabelaGestorPage>(
    {} as ITabelaGestorPage
  );
  const [loading, setLoading] = useState(false);

  const createNewManager = async (manager: IGestor) => {
    nProgress.start();
    try {
      await axios
        .post(`${baseurl}/gestor/cadastro`, manager, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Usuário cadastrado com sucesso");
          navigate("/dashboard");
        });
    } catch (error) {
      toast.error("Erro ao cadastrar usuário");
    } finally {
      nProgress.done();
    }
  };

  const getManagers = async (page: number) => {
    nProgress.start();
    setLoading(true);
    try {
      await axios
        .get(
          `${baseurl}/gestor?pagina=${page}&tamanho=10&sort=idGestor&order=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setGestorDados(response.data.elementos);
          setPageDados({
            totalPages: response.data.quantidadePaginas,
            atualPage: response.data.pagina,
            pageSize: response.data.tamanho,
          });
        });
    } catch (error) {
      toast.error("Erro ao buscar usuários");
    } finally {
      nProgress.done();
      setLoading(false);
    }
  };

  const editManager = async (idGestor: number, managerData: IGestor) => {
    nProgress.start();
    try {
      await axios
        .put(`${baseurl}/gestor/${idGestor}`, managerData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Usuário editado com sucesso");
          navigate("/dashboard");
        });
    } catch (error) {
      toast.error("Erro ao editar usuário");
    } finally {
      nProgress.done();
    }
  };

  const deleteManager = async (idManager: number) => {
    nProgress.start();
    try {
      await axios
        .delete(`${baseurl}/gestor/${idManager}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Usuário deletado com sucesso");
          getManagers(0);
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
        createNewManager,
        getManagers,
        deleteManager,
        editManager,
        gestorDados,
        loading,
        pageDados,
      }}
    >
      {children}
    </ManagerContext.Provider>
  );
};

export const useManager = () => useContext(ManagerContext);
