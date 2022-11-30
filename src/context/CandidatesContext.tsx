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
  const token = localStorage.getItem("token");

  const setFormValues = (values: object) => {
    setData((prevValues) => ({
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

          axios
            .post(`${baseurl}/candidato/cadastro`, {
              ...candidato,
              idFormulario,
            })
            .then(() => {
              nProgress.done();
            })
            .catch((err) => {
              toast.error(err.response.data.errors[0]);
              console.log(err);
              nProgress.done();
            });
        });
      toast.success("Candidato cadastrado com sucesso!");
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  return (
    <CandidatesContext.Provider
      value={{ setFormValues, getTrilhas, createCandidate, data, trilhas }}
    >
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidates = () => useContext(CandidatesContext);
