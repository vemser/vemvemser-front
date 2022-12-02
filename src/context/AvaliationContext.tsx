import { useState, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { baseurl } from "../utils/baseurl";
import axios from "axios";
import nProgress from "nprogress";
import { IChildren } from "../utils/interfaces";

export interface IAvaliationContext {
  registerAvaliation: (
    aprovadoBoolean: boolean,
    idInscricao: number
  ) => Promise<void>;
}

export const AvaliationContext = createContext({} as IAvaliationContext);

export const AvaliationProvider = ({ children }: IChildren) => {
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
          toast.success(aprovadoBoolean ? "Você aprovou a inscrição!" : "Você reprovou a inscrição!");
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
  return (
    <AvaliationContext.Provider
      value={{
        registerAvaliation,
      }}
    >
      {children}
    </AvaliationContext.Provider>
  );
};

export const useAvaliation = () => useContext(AvaliationContext);
