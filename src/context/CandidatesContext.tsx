import { useState, createContext, useContext } from "react";
import {
  ICandidateContext,
  ICandidateForm,
  IChildren,
  IInscriptionForm,
  ITrilhas,
} from "../utils/interfaces";
import { toast } from "react-toastify";
import { baseurl } from "../utils/baseurl";
import axios from "axios";
import nProgress from "nprogress";

export const CandidatesContext = createContext({} as ICandidateContext);

export const CandidatesProvider = ({ children }: IChildren) => {
  const [data, setData] = useState<IInscriptionForm & ICandidateForm>(
    {} as IInscriptionForm & ICandidateForm
  );
  const [trilhas, setTrilhas] = useState<ITrilhas[]>([]);
  const [idForm, setIdForm] = useState<number>(0);

  const setFormValues = (values: object) => {
    setData((prevValues: any) => ({
      ...prevValues,
      ...values,
    }));
  };

  const getTrilhas = () => {
    try {
      axios
        .get(`${baseurl}/trilha/listar`)
        .then((res) => {
          setTrilhas(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  const createCandidate = async (
    formulario: IInscriptionForm,
    candidato: ICandidateForm
  ) => {
    nProgress.start();
    try {
      await axios
        .post(
          `http://vemser-dbc.dbccompany.com.br:39000/vemser/vemvemser-back/formulario/cadastro`,
          formulario
        )
        .then((response) => {
          const idFormulario = response.data.idFormulario;
          setIdForm(idFormulario);

          axios
            .post(`${baseurl}/candidato/cadastro`, {
              ...candidato,
              idFormulario,
            })
            .then(() => {
              toast.success("Seu formulário foi enviado com sucesso!");
              nProgress.done();
            })
            .catch((err) => {
              // toast.error(err.response?.data?.errors[0]);
              console.log(err);
              nProgress.done();
            });
        });
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  const updateCurriculo = (idFormulario: number, curriculo: any) => {
    nProgress.start();
    try {
      axios
        .put(
          `${baseurl}/formulario/update-curriculo-by-id-formulario/${idFormulario}`,
          curriculo
        )
        .then(() => {
          console.log("curriculo atualizado");
          nProgress.done();
        });
    } catch (error) {
      toast.error("Erro ao atualizar currículo");
    } finally {
      nProgress.done();
    }
  };

  return (
    <CandidatesContext.Provider
      value={{
        setFormValues,
        getTrilhas,
        createCandidate,
        updateCurriculo,
        data,
        trilhas,
        idForm,
      }}
    >
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidates = () => useContext(CandidatesContext);
