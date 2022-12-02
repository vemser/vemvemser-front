import { useState, createContext, useContext } from "react";
import {
  ICandidateContext,
  ICandidateForm,
  ICandidatosDados,
  ICandidatosElementos,
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
  const [candidates, setCandidates] = useState<ICandidatosDados>(
    {} as ICandidatosDados
  );
  const [searcheredCandidates, setSearcheredCandidates] =
    useState<ICandidatosElementos>({} as ICandidatosElementos);
  const [candidatePdf, setCandidatePdf] = useState<string>("");
  const [candidateSelected, setCandidateSelected] =
    useState<ICandidatosElementos>({} as ICandidatosElementos);

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
          localStorage.setItem("idFormulario", idFormulario);

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

  const updateCurriculo = (curriculo: FormData) => {
    nProgress.start();
    try {
      const idFormulary: string = localStorage.getItem("idFormulario") || "";
      axios
        .put(
          `${baseurl}/update-curriculo-by-id-formulario?idFormulario=${parseInt(
            idFormulary
          )}`,
          curriculo
        )
        .then(() => {
          toast.success("Seu currículo foi enviado com sucesso!");
          nProgress.done();
        })
        .catch((err) => {
          // toast.error(err.response?.data?.errors[0]);
          console.log(err);
          nProgress.done();
        });
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
      // remove o id do formulário do localStorage
      localStorage.removeItem("idFormulario");
    }
  };

  const getCandidates = async (page: number) => {
    const token = localStorage.getItem("token");
    nProgress.start();
    try {
      axios
        .get(
          `${baseurl}/inscricao?pagina=${page}&tamanho=10&sort=idInscricao&order=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setCandidates(res.data);
          nProgress.done();
        });
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  const getCandidateByEmail = async (email: string) => {
    const token = localStorage.getItem("token");
    nProgress.start();
    try {
      axios
        .get(`${baseurl}/candidato/buscar-by-email?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setSearcheredCandidates(res.data);
          nProgress.done();
        });
    } catch (error) {
      console.log(error);
      // seta o valor do candidato buscado como vazio
      setSearcheredCandidates({} as ICandidatosElementos);
    } finally {
      nProgress.done();
    }
  };

  const getFormularioById = async (idFormulario: number) => {
    const token = localStorage.getItem("token");
    nProgress.start();
    try {
      axios
        .get(
          `${baseurl}/formulario/get-curriculo-by-id-formulario?idFormulario=${idFormulario}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setCandidatePdf(res.data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      nProgress.done();
    }
  };

  const getCandidateById = async (idCandidato: number) => {
    const token = localStorage.getItem("token");
    nProgress.start();
    try {
      axios
        .get(`${baseurl}/inscricao/by-id?id=${idCandidato}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setCandidateSelected(res.data);
        });
    } catch (error) {
      console.log(error);
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
        getCandidates,
        getCandidateByEmail,
        getFormularioById,
        getCandidateById,
        candidateSelected,
        candidatePdf,
        searcheredCandidates,
        data,
        trilhas,
        candidates,
      }}
    >
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidates = () => useContext(CandidatesContext);
