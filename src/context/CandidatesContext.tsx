import { useState, createContext, useContext } from "react";
import {
  ICandidateContext,
  ICandidateForm,
  IChildren,
  IInscriptionForm,
  ITrilhas,
} from "../utils/interfaces";
import { baseurl } from "../utils/baseurl";
import { toast } from "react-toastify";
import nProgress from "nprogress";
import axios from "axios";

export const CandidatesContext = createContext({} as ICandidateContext);

export const CandidatesProvider = ({ children }: IChildren) => {
  // const [data, setData] = useState({});
  // state data types = IInscriptionForm + ICandidateForm
  const [data, setData] = useState<IInscriptionForm & ICandidateForm>(
    {} as IInscriptionForm & ICandidateForm
  );
  const [trilhas, setTrilhas] = useState<ITrilhas[]>([]);

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

  const postFormulario = (
    formulario: IInscriptionForm,
    candidato: ICandidateForm
  ) => {
    try {
      nProgress.start();
      axios
        .post(`${baseurl}/formulario`, {
          formulario,
        })
        .then((res) => {
          console.log(res);
          toast.success("Formulário enviado com sucesso!");
        });
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  return (
    <CandidatesContext.Provider
      value={{ setFormValues, getTrilhas, postFormulario, data, trilhas }}
    >
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidates = () => useContext(CandidatesContext);
