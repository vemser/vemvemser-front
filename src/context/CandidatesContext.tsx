import { useState, createContext, useContext } from "react";
import { ICandidateContext, IChildren, ITrilhas } from "../utils/interfaces";
import { baseurl } from "../utils/baseurl";
import axios from "axios";

export const CandidatesContext = createContext({} as ICandidateContext);

export const CandidatesProvider = ({ children }: IChildren) => {
  const [data, setData] = useState({});
  const [trilhas, setTrilhas] = useState<ITrilhas[]>([]);

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

  return (
    <CandidatesContext.Provider
      value={{ setFormValues, getTrilhas, data, trilhas }}
    >
      {children}
    </CandidatesContext.Provider>
  );
};

export const useCandidates = () => useContext(CandidatesContext);
