import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { baseurl } from "../utils/baseurl";
import axios from "axios";
import nProgress from "nprogress";
import { IAvaliationContext, IChildren } from "../utils/interfaces";
import { IAvaliation } from "../utils/interfaces";

export const AvaliationContext = createContext({} as IAvaliationContext);

export const AvaliationProvider = ({ children }: IChildren) => {
  const [avaliationData, setAvaliationData] = useState<IAvaliation>(
    {} as IAvaliation
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
          `${baseurl}/avaliacao?pagina=${page}&tamanho=20&sort=idAvaliacao&order=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setAvaliationData(response.data);
          nProgress.done();
        });
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };
  return (
    <AvaliationContext.Provider
      value={{
        registerAvaliation,
        getAvaliations,
        avaliationData,
      }}
    >
      {children}
    </AvaliationContext.Provider>
  );
};

export const useAvaliation = () => useContext(AvaliationContext);
