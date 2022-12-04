import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { baseurl } from "../utils/baseurl";
import axios from "axios";
import nProgress from "nprogress";
import {
  IAvaliationCandidate,
  IAvaliationContext,
  IChildren,
} from "../utils/interfaces";
import { IAvaliation } from "../utils/interfaces";

export const AvaliationContext = createContext({} as IAvaliationContext);

export const AvaliationProvider = ({ children }: IChildren) => {
  const [avaliationData, setAvaliationData] = useState<IAvaliation>(
    {} as IAvaliation
  );
  const [searcheredAvaliation, setSearcheredAvaliation] = useState<
    IAvaliationCandidate[]
  >({} as IAvaliationCandidate[]);

  const [avaliationById, setAvaliationById] = useState<IAvaliationCandidate>(
    {} as IAvaliationCandidate
  );

  const registerAvaliation = async (
    aprovadoBoolean: boolean,
    idInscricao: number
  ) => {
    const token = localStorage.getItem("token");
    nProgress.start();
    try {
      axios
        .post(
          `${baseurl}/avaliacao`,
          {
            aprovadoBoolean: aprovadoBoolean,
            idInscricao: idInscricao,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          toast.success(
            aprovadoBoolean
              ? "Você aprovou a inscrição!"
              : "Você reprovou a inscrição!"
          );
        });
    } catch (error) {
      //   toast.error(error.response.data.message);
      if (axios.isAxiosError(error) && error.response) {
        toast.error("Houve um erro ao realizar a avaliação");
      }
    } finally {
      nProgress.done();
    }
  };

  const getAvaliations = async (page: number) => {
    const token = localStorage.getItem("token");
    nProgress.start();
    try {
      await axios
        .get(
          `${baseurl}/avaliacao?pagina=${page}&tamanho=20&sort=aprovado&order=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setAvaliationData(response.data);
          nProgress.done();
        });
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  const getAvaliationByEmail = async (email: string) => {
    const token = localStorage.getItem("token");
    nProgress.start();
    try {
      axios
        .get(`${baseurl}/avaliacao/buscar-by-email?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSearcheredAvaliation(res.data);
        });
    } catch (error) {
      console.log(error);
      toast.error("Erro ao buscar candidato");
    } finally {
      nProgress.done();
    }
  };

  const deleteAvaliation = async (idAvaliacao: number) => {
    const token = localStorage.getItem("token");
    nProgress.start();
    try {
      axios
        .delete(`${baseurl}/avaliacao/?idAvaliacao=${idAvaliacao}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          toast.success("Você deletou todos os dados desse candidato!");
        });
    } catch (error) {
      console.log(error);
      toast.error("Erro ao deletar candidato");
    } finally {
      nProgress.done();
    }
  };

  const getAvaliationById = async (idAvaliacao: number) => {
    const token = localStorage.getItem("token");
    nProgress.start();
    try {
      axios
        .get(` ${baseurl}/avaliacao/by-id?id=${idAvaliacao}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setAvaliationById(res.data);
        });
    } catch (error) {
      console.log(error);
      toast.error("Erro ao buscar candidato");
    } finally {
      nProgress.done();
    }
  };

  return (
    <AvaliationContext.Provider
      value={{
        registerAvaliation,
        getAvaliations,
        getAvaliationByEmail,
        deleteAvaliation,
        getAvaliationById,
        avaliationById,
        searcheredAvaliation,
        avaliationData,
      }}
    >
      {children}
    </AvaliationContext.Provider>
  );
};

export const useAvaliation = () => useContext(AvaliationContext);
